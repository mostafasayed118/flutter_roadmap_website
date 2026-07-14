import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const getRoadmapWithProgress = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const phases = await ctx.db
      .query("roadmapPhases")
      .withIndex("by_order")
      .collect();

    const progressRecords = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const progressMap = new Map<string, Doc<"userProgress">>();
    for (const p of progressRecords) {
      progressMap.set(p.weekId, p);
    }

    const phasesWithWeeks = [];
    for (const phase of phases) {
      const phaseWeeks = await ctx.db
        .query("roadmapWeeks")
        .withIndex("by_phase_order", (q) => q.eq("phaseId", phase._id))
        .collect();

      const enrichedWeeks = phaseWeeks.map((week) => {
        const progress = progressMap.get(week._id);
        return {
          ...week,
          progress: progress
            ? {
                completedTopics: progress.completedTopics,
                completedProjects: progress.completedProjects,
              }
            : { completedTopics: [], completedProjects: [] },
        };
      });

      const totalTopics = enrichedWeeks.reduce(
        (s, w) => s + w.topics.length,
        0
      );
      const totalProjects = enrichedWeeks.reduce(
        (s, w) => s + w.projects.length,
        0
      );
      const doneTopics = enrichedWeeks.reduce(
        (s, w) => s + w.progress.completedTopics.length,
        0
      );
      const doneProjects = enrichedWeeks.reduce(
        (s, w) => s + w.progress.completedProjects.length,
        0
      );

      phasesWithWeeks.push({
        ...phase,
        weeks: enrichedWeeks,
        stats: {
          totalTopics,
          totalProjects,
          completedTopics: doneTopics,
          completedProjects: doneProjects,
        },
      });
    }

    return phasesWithWeeks;
  },
});

export const getOverallStats = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const weeks = await ctx.db.query("roadmapWeeks").collect();
    const progressRecords = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const progressMap = new Map<string, Doc<"userProgress">>();
    for (const p of progressRecords) {
      progressMap.set(p.weekId, p);
    }

    const totalTopics = weeks.reduce((s, w) => s + w.topics.length, 0);
    const totalProjects = weeks.reduce((s, w) => s + w.projects.length, 0);
    const completedTopics = weeks.reduce((s, w) => {
      const p = progressMap.get(w._id);
      return s + (p ? p.completedTopics.length : 0);
    }, 0);
    const completedProjects = weeks.reduce((s, w) => {
      const p = progressMap.get(w._id);
      return s + (p ? p.completedProjects.length : 0);
    }, 0);

    const totalItems = totalTopics + totalProjects;
    const completedItems = completedTopics + completedProjects;
    const overallPercentage =
      totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    const phases = await ctx.db
      .query("roadmapPhases")
      .withIndex("by_order")
      .collect();

    let currentPhase: Doc<"roadmapPhases"> | null = null;
    let currentWeek: Doc<"roadmapWeeks"> | null = null;

    for (const phase of phases) {
      const phaseWeeks = await ctx.db
        .query("roadmapWeeks")
        .withIndex("by_phase_order", (q) => q.eq("phaseId", phase._id))
        .collect();

      for (const week of phaseWeeks) {
        const p = progressMap.get(week._id);
        const doneTopics = p ? p.completedTopics.length : 0;
        const doneProjects = p ? p.completedProjects.length : 0;
        if (
          doneTopics < week.topics.length ||
          doneProjects < week.projects.length
        ) {
          currentPhase = phase;
          currentWeek = week;
          break;
        }
      }
      if (currentWeek) break;
    }

    const allWeeks = [...weeks].sort((a, b) => a.order - b.order);
    const weekIndex = allWeeks.findIndex(
      (w) => w._id === currentWeek?._id
    );
    const currentWeekNumber = weekIndex >= 0 ? weekIndex + 1 : null;

    const nextItems: {
      title: string;
      week: string;
      type: "topic" | "project";
    }[] = [];
    for (const week of allWeeks) {
      const p = progressMap.get(week._id);
      const doneTopicsSet = new Set(p?.completedTopics ?? []);
      const doneProjectsSet = new Set(p?.completedProjects ?? []);

      for (let i = 0; i < week.topics.length; i++) {
        if (!doneTopicsSet.has(i)) {
          nextItems.push({
            title: week.topics[i]!,
            week: week.title,
            type: "topic",
          });
          if (nextItems.length >= 3) break;
        }
      }
      if (nextItems.length >= 3) break;

      for (let i = 0; i < week.projects.length; i++) {
        if (!doneProjectsSet.has(i)) {
          nextItems.push({
            title: week.projects[i]!,
            week: week.title,
            type: "project",
          });
          if (nextItems.length >= 3) break;
        }
      }
      if (nextItems.length >= 3) break;
    }

    return {
      overallPercentage,
      totalTopics,
      totalProjects,
      completedTopics,
      completedProjects,
      currentPhase,
      currentWeek,
      currentWeekNumber,
      nextItems,
    };
  },
});

export const toggleItem = mutation({
  args: {
    userId: v.string(),
    weekId: v.id("roadmapWeeks"),
    type: v.union(v.literal("topic"), v.literal("project")),
    index: v.number(),
  },
  handler: async (ctx, args) => {
    const week = await ctx.db.get(args.weekId);
    if (!week) {
      throw new Error(`Week not found: ${args.weekId}`);
    }

    const maxIndex =
      args.type === "topic"
        ? week.topics.length
        : week.projects.length;

    if (args.index < 0 || args.index >= maxIndex) {
      throw new Error(
        `Invalid ${args.type} index: ${args.index}. Must be 0–${maxIndex - 1}`
      );
    }

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_week", (q) =>
        q.eq("userId", args.userId).eq("weekId", args.weekId)
      )
      .first();

    if (existing) {
      const completedField =
        args.type === "topic"
          ? existing.completedTopics
          : existing.completedProjects;
      const completed = new Set(completedField);

      if (completed.has(args.index)) {
        completed.delete(args.index);
      } else {
        completed.add(args.index);
      }

      const sorted = Array.from(completed).sort((a, b) => a - b);
      await ctx.db.patch(existing._id, {
        [args.type === "topic" ? "completedTopics" : "completedProjects"]:
          sorted,
      });
    } else {
      await ctx.db.insert("userProgress", {
        userId: args.userId,
        weekId: args.weekId,
        completedTopics: args.type === "topic" ? [args.index] : [],
        completedProjects: args.type === "project" ? [args.index] : [],
      });
    }
  },
});

export const updateWeekNotes = mutation({
  args: {
    userId: v.string(),
    weekId: v.id("roadmapWeeks"),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    // Cap notes to 5000 characters to prevent oversized payloads
    const MAX_NOTES = 5000;
    const notes = args.notes.length > MAX_NOTES ? args.notes.slice(0, MAX_NOTES) : args.notes;

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_week", (q) =>
        q.eq("userId", args.userId).eq("weekId", args.weekId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { notes });
    } else {
      await ctx.db.insert("userProgress", {
        userId: args.userId,
        weekId: args.weekId,
        completedTopics: [],
        completedProjects: [],
        notes,
      });
    }
  },
});

export const getWeekNotes = query({
  args: {
    userId: v.string(),
    weekId: v.id("roadmapWeeks"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_week", (q) =>
        q.eq("userId", args.userId).eq("weekId", args.weekId)
      )
      .first();

    return existing?.notes ?? "";
  },
});

export interface BadgeProgressData {
  /** Week order numbers (1-based) where all topics + projects are complete */
  completedWeekOrders: number[];
  /** Phase order numbers (1-based) where at least 1 topic or project is done */
  startedPhaseOrders: number[];
  /** Phase order numbers (1-based) where ALL topics + projects across ALL weeks are done */
  completedPhaseOrders: number[];
  /** Total weeks fully completed */
  totalWeeksCompleted: number;
}

export const getBadgeProgressData = query({
  args: { userId: v.string() },
  handler: async (ctx, args): Promise<BadgeProgressData> => {
    // 1. Fetch all phases (10 records) and all weeks (34 records) — lightweight
    const phases = await ctx.db
      .query("roadmapPhases")
      .withIndex("by_order")
      .collect();

    const allWeeks = await ctx.db.query("roadmapWeeks").collect();

    // 2. Build phaseId → phase order map
    const phaseOrderMap = new Map<string, number>();
    for (const phase of phases) {
      phaseOrderMap.set(phase._id, phase.order);
    }

    // 3. Fetch all user progress for this user (uses by_user index)
    const progressRecords = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const progressMap = new Map<string, Doc<"userProgress">>();
    for (const p of progressRecords) {
      progressMap.set(p.weekId, p);
    }

    // 4. Compute per-week and per-phase completion in a single pass
    const completedWeekOrders: number[] = [];
    const phaseStats = new Map<
      number,
      { totalTopics: number; totalProjects: number; doneTopics: number; doneProjects: number; hasAnyDone: boolean }
    >();

    for (const phase of phases) {
      phaseStats.set(phase.order, {
        totalTopics: 0,
        totalProjects: 0,
        doneTopics: 0,
        doneProjects: 0,
        hasAnyDone: false,
      });
    }

    for (const week of allWeeks) {
      const phaseOrder = phaseOrderMap.get(week.phaseId);
      if (phaseOrder === undefined) continue;

      const stats = phaseStats.get(phaseOrder)!;
      stats.totalTopics += week.topics.length;
      stats.totalProjects += week.projects.length;

      const progress = progressMap.get(week._id);
      if (progress) {
        const doneTopics = progress.completedTopics.length;
        const doneProjects = progress.completedProjects.length;
        stats.doneTopics += doneTopics;
        stats.doneProjects += doneProjects;

        if (doneTopics > 0 || doneProjects > 0) {
          stats.hasAnyDone = true;
        }

        // Week is complete if all topics and all projects are done
        if (
          doneTopics >= week.topics.length &&
          doneProjects >= week.projects.length
        ) {
          completedWeekOrders.push(week.order);
        }
      }
    }

    // 5. Compute phase-level completion
    const startedPhaseOrders: number[] = [];
    const completedPhaseOrders: number[] = [];

    for (const [phaseOrder, stats] of phaseStats) {
      if (stats.hasAnyDone) {
        startedPhaseOrders.push(phaseOrder);
      }
      const totalItems = stats.totalTopics + stats.totalProjects;
      const doneItems = stats.doneTopics + stats.doneProjects;
      if (totalItems > 0 && doneItems >= totalItems) {
        completedPhaseOrders.push(phaseOrder);
      }
    }

    return {
      completedWeekOrders,
      startedPhaseOrders,
      completedPhaseOrders,
      totalWeeksCompleted: completedWeekOrders.length,
    };
  },
});

/** @deprecated Use `toggleItem` instead. Kept for backward compatibility. */
export const toggleTopic = mutation({
  args: {
    userId: v.string(),
    weekId: v.id("roadmapWeeks"),
    topicIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const week = await ctx.db.get(args.weekId);
    if (!week) throw new Error(`Week not found: ${args.weekId}`);

    if (args.topicIndex < 0 || args.topicIndex >= week.topics.length) {
      throw new Error(
        `Invalid topic index: ${args.topicIndex}. Must be 0–${week.topics.length - 1}`
      );
    }

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_week", (q) =>
        q.eq("userId", args.userId).eq("weekId", args.weekId)
      )
      .first();

    if (existing) {
      const completed = new Set(existing.completedTopics);
      if (completed.has(args.topicIndex)) {
        completed.delete(args.topicIndex);
      } else {
        completed.add(args.topicIndex);
      }
      await ctx.db.patch(existing._id, {
        completedTopics: Array.from(completed).sort((a, b) => a - b),
      });
    } else {
      await ctx.db.insert("userProgress", {
        userId: args.userId,
        weekId: args.weekId,
        completedTopics: [args.topicIndex],
        completedProjects: [],
      });
    }
  },
});

/** @deprecated Use `toggleItem` instead. Kept for backward compatibility. */
export const toggleProject = mutation({
  args: {
    userId: v.string(),
    weekId: v.id("roadmapWeeks"),
    projectIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const week = await ctx.db.get(args.weekId);
    if (!week) throw new Error(`Week not found: ${args.weekId}`);

    if (args.projectIndex < 0 || args.projectIndex >= week.projects.length) {
      throw new Error(
        `Invalid project index: ${args.projectIndex}. Must be 0–${week.projects.length - 1}`
      );
    }

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_week", (q) =>
        q.eq("userId", args.userId).eq("weekId", args.weekId)
      )
      .first();

    if (existing) {
      const completed = new Set(existing.completedProjects);
      if (completed.has(args.projectIndex)) {
        completed.delete(args.projectIndex);
      } else {
        completed.add(args.projectIndex);
      }
      await ctx.db.patch(existing._id, {
        completedProjects: Array.from(completed).sort((a, b) => a - b),
      });
    } else {
      await ctx.db.insert("userProgress", {
        userId: args.userId,
        weekId: args.weekId,
        completedTopics: [],
        completedProjects: [args.projectIndex],
      });
    }
  },
});
