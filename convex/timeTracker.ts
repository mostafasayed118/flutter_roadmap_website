import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const MIN_DURATION = 1;
const MAX_DURATION = 1440;

export const addSession = mutation({
  args: {
    userId: v.string(),
    weekId: v.optional(v.id("roadmapWeeks")),
    durationMinutes: v.number(),
    date: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.durationMinutes < MIN_DURATION || args.durationMinutes > MAX_DURATION) {
      throw new Error(`Duration must be between ${MIN_DURATION} and ${MAX_DURATION} minutes`);
    }

    if (args.weekId) {
      const week = await ctx.db.get(args.weekId);
      if (!week) throw new Error("Referenced week not found");
    }

    return await ctx.db.insert("studySessions", {
      userId: args.userId,
      weekId: args.weekId,
      durationMinutes: args.durationMinutes,
      date: args.date,
      notes: args.notes,
    });
  },
});

export const updateSession = mutation({
  args: {
    sessionId: v.id("studySessions"),
    durationMinutes: v.optional(v.number()),
    notes: v.optional(v.string()),
    weekId: v.optional(v.id("roadmapWeeks")),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("Session not found");

    const patch: {
      durationMinutes?: number;
      notes?: string;
      weekId?: Id<"roadmapWeeks">;
    } = {};

    if (args.durationMinutes !== undefined) {
      if (args.durationMinutes < MIN_DURATION || args.durationMinutes > MAX_DURATION) {
        throw new Error(`Duration must be between ${MIN_DURATION} and ${MAX_DURATION} minutes`);
      }
      patch.durationMinutes = args.durationMinutes;
    }

    if (args.notes !== undefined) {
      patch.notes = args.notes;
    }

    if (args.weekId !== undefined) {
      if (args.weekId !== null) {
        const week = await ctx.db.get(args.weekId);
        if (!week) throw new Error("Referenced week not found");
      }
      patch.weekId = args.weekId;
    }

    await ctx.db.patch(args.sessionId, patch);
  },
});

export const deleteSession = mutation({
  args: { sessionId: v.id("studySessions") },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("Session not found");
    await ctx.db.delete(args.sessionId);
  },
});

export const getUserSessions = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getUserTotalTime = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
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
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const weekIds = new Set<string>();
    for (const session of sessions) {
      if (session.weekId) weekIds.add(session.weekId);
    }

    const weekMap = new Map<string, { order: number }>();
    for (const id of weekIds) {
      const week = await ctx.db.get(id as Id<"roadmapWeeks">);
      if (week) weekMap.set(id, { order: week.order });
    }

    const breakdown = new Map<string, { weekTitle: string; order: number; minutes: number }>();

    for (const session of sessions) {
      const key = session.weekId ?? "general";
      if (!breakdown.has(key)) {
        const weekData = session.weekId ? weekMap.get(session.weekId) : null;
        breakdown.set(key, {
          weekTitle: weekData ? `Week ${weekData.order}` : "General",
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
  args: { userId: v.string(), weekId: v.id("roadmapWeeks") },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("studySessions")
      .withIndex("by_user_week", (q) =>
        q.eq("userId", args.userId).eq("weekId", args.weekId)
      )
      .collect();

    const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { totalMinutes, hours, minutes, sessionCount: sessions.length };
  },
});
