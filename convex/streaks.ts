import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

function getStartOfDay(timestamp: number): number {
  const date = new Date(timestamp);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}

function getDaysBetween(a: number, b: number): number {
  const msPerDay = 86400000;
  return Math.floor(Math.abs(a - b) / msPerDay);
}

export const getStreak = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const streak = await ctx.db
      .query("userStreaks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!streak) {
      return { currentStreak: 0, longestStreak: 0, lastStudyDate: 0 };
    }

    // Check if streak is still active (studied today or yesterday)
    const today = getStartOfDay(Date.now());
    const daysSinceLastStudy = getDaysBetween(today, streak.lastStudyDate);

    if (daysSinceLastStudy > 1) {
      // Streak broken
      return {
        currentStreak: 0,
        longestStreak: streak.longestStreak,
        lastStudyDate: streak.lastStudyDate,
      };
    }

    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      lastStudyDate: streak.lastStudyDate,
    };
  },
});

export const recordStudyDay = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const today = getStartOfDay(Date.now());

    const existing = await ctx.db
      .query("userStreaks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (!existing) {
      // First study day
      await ctx.db.insert("userStreaks", {
        userId: args.userId,
        currentStreak: 1,
        longestStreak: 1,
        lastStudyDate: today,
        streakStartDate: today,
      });
      return { currentStreak: 1, longestStreak: 1 };
    }

    const daysSinceLastStudy = getDaysBetween(today, existing.lastStudyDate);

    if (daysSinceLastStudy === 0) {
      // Already recorded today
      return {
        currentStreak: existing.currentStreak,
        longestStreak: existing.longestStreak,
      };
    }

    if (daysSinceLastStudy === 1) {
      // Consecutive day — extend streak
      const newStreak = existing.currentStreak + 1;
      const newLongest = Math.max(newStreak, existing.longestStreak);
      await ctx.db.patch(existing._id, {
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastStudyDate: today,
      });
      return { currentStreak: newStreak, longestStreak: newLongest };
    }

    // Streak broken — restart
    await ctx.db.patch(existing._id, {
      currentStreak: 1,
      lastStudyDate: today,
      streakStartDate: today,
    });
    return { currentStreak: 1, longestStreak: existing.longestStreak };
  },
});
