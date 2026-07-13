import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getGoal = query({
  args: {
    userId: v.string(),
    weekNumber: v.number(),
    year: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userGoals")
      .withIndex("by_user_week", (q) =>
        q
          .eq("userId", args.userId)
          .eq("weekNumber", args.weekNumber)
          .eq("year", args.year)
      )
      .first();
  },
});

export const setGoal = mutation({
  args: {
    userId: v.string(),
    weekNumber: v.number(),
    targetHours: v.number(),
    targetTopics: v.number(),
    year: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userGoals")
      .withIndex("by_user_week", (q) =>
        q
          .eq("userId", args.userId)
          .eq("weekNumber", args.weekNumber)
          .eq("year", args.year)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        targetHours: args.targetHours,
        targetTopics: args.targetTopics,
      });
      return existing._id;
    }

    return await ctx.db.insert("userGoals", {
      userId: args.userId,
      weekNumber: args.weekNumber,
      targetHours: args.targetHours,
      targetTopics: args.targetTopics,
      year: args.year,
    });
  },
});
