import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireUser } from "./lib/auth";

export const getGoal = query({
  args: {
    weekNumber: v.number(),
    year: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    return await ctx.db
      .query("userGoals")
      .withIndex("by_user_week", (q) =>
        q
          .eq("userId", userId)
          .eq("weekNumber", args.weekNumber)
          .eq("year", args.year)
      )
      .first();
  },
});

export const setGoal = mutation({
  args: {
    weekNumber: v.number(),
    targetHours: v.number(),
    targetTopics: v.number(),
    year: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    // Clamp targets to valid ranges
    const targetHours = Math.max(1, Math.min(168, Math.round(args.targetHours)));
    const targetTopics = Math.max(1, Math.min(50, Math.round(args.targetTopics)));

    const existing = await ctx.db
      .query("userGoals")
      .withIndex("by_user_week", (q) =>
        q
          .eq("userId", userId)
          .eq("weekNumber", args.weekNumber)
          .eq("year", args.year)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        targetHours,
        targetTopics,
      });
      return existing._id;
    }

    return await ctx.db.insert("userGoals", {
      userId,
      weekNumber: args.weekNumber,
      targetHours,
      targetTopics,
      year: args.year,
    });
  },
});
