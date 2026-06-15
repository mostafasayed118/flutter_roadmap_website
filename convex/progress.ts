import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getRoadmapWithProgress = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const phases = (await ctx.db.query("roadmapPhases").collect()).sort((a, b) => a.order - b.order);
    const weeks = await ctx.db.query("roadmapWeeks").collect();
    const progressRecords = await ctx.db
      .query("userProgress")
      .withIndex("by_user_week", (q) => q.eq("userId", args.userId))
      .collect();

    const progressMap = new Map<string, Doc<"userProgress">>();
    for (const p of progressRecords) {
      progressMap.set(p.weekId, p);
    }

    return phases.map((phase) => {
      const phaseWeeks = weeks
        .filter((w) => w.phaseId === phase._id)
        .sort((a, b) => a.order - b.order)
        .map((week) => {
          const progress = progressMap.get(week._id);
          return {
            ...week,
            progress: progress
              ? { completedTopics: progress.completedTopics, completedProjects: progress.completedProjects }
              : { completedTopics: [], completedProjects: [] },
          };
        });

      const totalTopics = phaseWeeks.reduce((s, w) => s + w.topics.length, 0);
      const totalProjects = phaseWeeks.reduce((s, w) => s + w.projects.length, 0);
      const doneTopics = phaseWeeks.reduce((s, w) => s + w.progress.completedTopics.length, 0);
      const doneProjects = phaseWeeks.reduce((s, w) => s + w.progress.completedProjects.length, 0);

      return {
        ...phase,
        weeks: phaseWeeks,
        stats: { totalTopics, totalProjects, completedTopics: doneTopics, completedProjects: doneProjects },
      };
    });
  },
});

export const getOverallStats = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const weeks = await ctx.db.query("roadmapWeeks").collect();
    const progressRecords = await ctx.db
      .query("userProgress")
      .withIndex("by_user_week", (q) => q.eq("userId", args.userId))
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
    const overallPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    const phases = (await ctx.db.query("roadmapPhases").collect()).sort((a, b) => a.order - b.order);
    let currentPhase = null;
    let currentWeek = null;

    for (const phase of phases) {
      const phaseWeeks = weeks.filter((w) => w.phaseId === phase._id).sort((a, b) => a.order - b.order);
      for (const week of phaseWeeks) {
        const p = progressMap.get(week._id);
        const doneTopics = p ? p.completedTopics.length : 0;
        const doneProjects = p ? p.completedProjects.length : 0;
        if (doneTopics < week.topics.length || doneProjects < week.projects.length) {
          currentPhase = phase;
          currentWeek = week;
          break;
        }
      }
      if (currentWeek) break;
    }

    const allWeeks = [...weeks].sort((a, b) => a.order - b.order);
    const weekIndex = allWeeks.findIndex((w) => w._id === currentWeek?._id);
    const currentWeekNumber = weekIndex >= 0 ? weekIndex + 1 : null;

    const nextItems: { title: string; week: string; type: "topic" | "project" }[] = [];
    for (const week of allWeeks) {
      const p = progressMap.get(week._id);
      const doneTopicsSet = new Set(p?.completedTopics ?? []);
      const doneProjectsSet = new Set(p?.completedProjects ?? []);

      for (let i = 0; i < week.topics.length; i++) {
        if (!doneTopicsSet.has(i)) {
          nextItems.push({ title: week.topics[i]!, week: week.title, type: "topic" });
          if (nextItems.length >= 3) break;
        }
      }
      if (nextItems.length >= 3) break;

      for (let i = 0; i < week.projects.length; i++) {
        if (!doneProjectsSet.has(i)) {
          nextItems.push({ title: week.projects[i]!, week: week.title, type: "project" });
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

export const toggleTopic = mutation({
  args: { userId: v.string(), weekId: v.id("roadmapWeeks"), topicIndex: v.number() },
  handler: async (ctx, args) => {
    const week = await ctx.db.get(args.weekId);
    if (!week) throw new Error("Week not found");

    if (args.topicIndex < 0 || args.topicIndex >= week.topics.length) {
      throw new Error(`Invalid topic index: ${args.topicIndex}. Must be 0–${week.topics.length - 1}`);
    }

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_week", (q) => q.eq("userId", args.userId).eq("weekId", args.weekId))
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

export const toggleProject = mutation({
  args: { userId: v.string(), weekId: v.id("roadmapWeeks"), projectIndex: v.number() },
  handler: async (ctx, args) => {
    const week = await ctx.db.get(args.weekId);
    if (!week) throw new Error("Week not found");

    if (args.projectIndex < 0 || args.projectIndex >= week.projects.length) {
      throw new Error(`Invalid project index: ${args.projectIndex}. Must be 0–${week.projects.length - 1}`);
    }

    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_week", (q) => q.eq("userId", args.userId).eq("weekId", args.weekId))
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
