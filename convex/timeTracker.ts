import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { requireUser } from "./lib/auth";

const MIN_DURATION = 1;
const MAX_DURATION = 1440;

export const addSession = mutation({
  args: {
    weekId: v.optional(v.id("roadmapWeeks")),
    durationMinutes: v.number(),
    date: v.number(),
    notes: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    if (
      args.durationMinutes < MIN_DURATION ||
      args.durationMinutes > MAX_DURATION
    ) {
      throw new Error(
        `Duration must be between ${MIN_DURATION} and ${MAX_DURATION} minutes`
      );
    }

    if (args.weekId) {
      const week = await ctx.db.get(args.weekId);
      if (!week) throw new Error(`Referenced week not found: ${args.weekId}`);
    }

    // Cap notes to 2000 characters to prevent oversized payloads
    const MAX_NOTES = 2000;
    const notes = args.notes && args.notes.length > MAX_NOTES
      ? args.notes.slice(0, MAX_NOTES)
      : args.notes;

    return await ctx.db.insert("studySessions", {
      userId,
      weekId: args.weekId,
      durationMinutes: args.durationMinutes,
      date: args.date,
      notes,
      tags: args.tags,
    });
  },
});

export const updateSession = mutation({
  args: {
    sessionId: v.id("studySessions"),
    durationMinutes: v.optional(v.number()),
    date: v.optional(v.number()),
    notes: v.optional(v.string()),
    weekId: v.optional(v.id("roadmapWeeks")),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error(`Session not found: ${args.sessionId}`);
    if (session.userId !== userId) {
      throw new Error("Not authorized to edit this session");
    }

    const patch: {
      durationMinutes?: number;
      date?: number;
      notes?: string;
      weekId?: Id<"roadmapWeeks">;
      tags?: string[];
    } = {};

    if (args.durationMinutes !== undefined) {
      if (
        args.durationMinutes < MIN_DURATION ||
        args.durationMinutes > MAX_DURATION
      ) {
        throw new Error(
          `Duration must be between ${MIN_DURATION} and ${MAX_DURATION} minutes`
        );
      }
      patch.durationMinutes = args.durationMinutes;
    }

    if (args.date !== undefined) {
      patch.date = args.date;
    }

    if (args.notes !== undefined) {
      const MAX_NOTES = 2000;
      patch.notes = args.notes.length > MAX_NOTES ? args.notes.slice(0, MAX_NOTES) : args.notes;
    }

    if (args.tags !== undefined) {
      patch.tags = args.tags;
    }

    if (args.weekId !== undefined) {
      if (args.weekId !== null) {
        const week = await ctx.db.get(args.weekId);
        if (!week)
          throw new Error(`Referenced week not found: ${args.weekId}`);
      }
      patch.weekId = args.weekId;
    }

    await ctx.db.patch(args.sessionId, patch);
  },
});

export const deleteSession = mutation({
  args: { sessionId: v.id("studySessions") },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error(`Session not found: ${args.sessionId}`);
    if (session.userId !== userId) {
      throw new Error("Not authorized to delete this session");
    }
    await ctx.db.delete(args.sessionId);
  },
});

export const getUserSessions = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUser(ctx);
    return await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getUserTotalTime = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUser(ctx);
    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const totalMinutes = sessions.reduce(
      (sum, s) => sum + s.durationMinutes,
      0
    );
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return {
      totalMinutes,
      totalHours,
      remainingMinutes,
      sessionCount: sessions.length,
    };
  },
});

export const getWeeklyTimeBreakdown = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUser(ctx);
    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const weekIdSet = new Set<string>();
    for (const session of sessions) {
      if (session.weekId) weekIdSet.add(session.weekId);
    }

    const weekDataMap = new Map<string, { order: number }>();
    const weekIdArray = Array.from(weekIdSet) as Id<"roadmapWeeks">[];
    const weekFetches = await Promise.all(
      weekIdArray.map((id) => ctx.db.get(id))
    );
    for (let i = 0; i < weekFetches.length; i++) {
      const week = weekFetches[i];
      if (week) weekDataMap.set(weekIdArray[i]!, { order: week.order });
    }

    const breakdown = new Map<
      string,
      { weekTitle: string; order: number; minutes: number }
    >();

    for (const session of sessions) {
      const key = session.weekId ?? "general";
      if (!breakdown.has(key)) {
        const weekData = session.weekId
          ? weekDataMap.get(session.weekId)
          : null;
        let weekTitle: string;
        if (weekData) {
          weekTitle = `Week ${weekData.order}`;
        } else if (session.weekId) {
          weekTitle = "Deleted Week";
        } else {
          weekTitle = "General";
        }
        breakdown.set(key, {
          weekTitle,
          order: weekData?.order ?? 0,
          minutes: 0,
        });
      }
      breakdown.get(key)!.minutes += session.durationMinutes;
    }

    return Array.from(breakdown.values())
      .sort((a, b) => a.order - b.order)
      .slice(-8);
  },
});

export const getWeekTotalTime = query({
  args: { weekId: v.id("roadmapWeeks") },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user_week", (q) =>
        q.eq("userId", userId).eq("weekId", args.weekId)
      )
      .collect();

    const totalMinutes = sessions.reduce(
      (sum, s) => sum + s.durationMinutes,
      0
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { totalMinutes, hours, minutes, sessionCount: sessions.length };
  },
});

export const getTagBreakdown = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUser(ctx);
    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const tagMap = new Map<string, number>();
    let untaggedMinutes = 0;

    for (const session of sessions) {
      if (session.tags && session.tags.length > 0) {
        for (const tag of session.tags) {
          tagMap.set(tag, (tagMap.get(tag) ?? 0) + session.durationMinutes);
        }
      } else {
        untaggedMinutes += session.durationMinutes;
      }
    }

    const tags = Array.from(tagMap.entries())
      .map(([tag, minutes]) => ({ tag, minutes }))
      .sort((a, b) => b.minutes - a.minutes);

    return { tags, untaggedMinutes };
  },
});
