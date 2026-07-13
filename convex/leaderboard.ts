import { v } from "convex/values";
import { query } from "./_generated/server";

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    // Get all progress records
    const allProgress = await ctx.db.query("userProgress").collect();
    const allSessions = await ctx.db.query("studySessions").collect();
    const allWeeks = await ctx.db.query("roadmapWeeks").collect();

    const totalTopics = allWeeks.reduce((s, w) => s + w.topics.length, 0);
    const totalProjects = allWeeks.reduce((s, w) => s + w.projects.length, 0);
    const totalItems = totalTopics + totalProjects;

    // Aggregate by user
    const userStats = new Map<
      string,
      {
        completedTopics: number;
        completedProjects: number;
        totalMinutes: number;
      }
    >();

    for (const p of allProgress) {
      const existing = userStats.get(p.userId) ?? {
        completedTopics: 0,
        completedProjects: 0,
        totalMinutes: 0,
      };
      existing.completedTopics += p.completedTopics.length;
      existing.completedProjects += p.completedProjects.length;
      userStats.set(p.userId, existing);
    }

    for (const s of allSessions) {
      const existing = userStats.get(s.userId) ?? {
        completedTopics: 0,
        completedProjects: 0,
        totalMinutes: 0,
      };
      existing.totalMinutes += s.durationMinutes;
      userStats.set(s.userId, existing);
    }

    // Convert to leaderboard entries
    const entries = Array.from(userStats.entries())
      .map(([userId, stats]) => {
        const completedItems = stats.completedTopics + stats.completedProjects;
        const progress =
          totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        return {
          userId,
          displayName: userId.slice(0, 8) + "...",
          completedTopics: stats.completedTopics,
          completedProjects: stats.completedProjects,
          totalMinutes: stats.totalMinutes,
          totalHours: Math.round((stats.totalMinutes / 60) * 10) / 10,
          progress,
        };
      })
      .sort((a, b) => b.progress - a.progress || b.totalMinutes - a.totalMinutes)
      .slice(0, 20);

    return entries;
  },
});

export const getUserRank = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const allProgress = await ctx.db.query("userProgress").collect();
    const allSessions = await ctx.db.query("studySessions").collect();
    const allWeeks = await ctx.db.query("roadmapWeeks").collect();

    const totalTopics = allWeeks.reduce((s, w) => s + w.topics.length, 0);
    const totalProjects = allWeeks.reduce((s, w) => s + w.projects.length, 0);
    const totalItems = totalTopics + totalProjects;

    const userStats = new Map<
      string,
      { completedTopics: number; completedProjects: number; totalMinutes: number }
    >();

    for (const p of allProgress) {
      const existing = userStats.get(p.userId) ?? { completedTopics: 0, completedProjects: 0, totalMinutes: 0 };
      existing.completedTopics += p.completedTopics.length;
      existing.completedProjects += p.completedProjects.length;
      userStats.set(p.userId, existing);
    }

    for (const s of allSessions) {
      const existing = userStats.get(s.userId) ?? { completedTopics: 0, completedProjects: 0, totalMinutes: 0 };
      existing.totalMinutes += s.durationMinutes;
      userStats.set(s.userId, existing);
    }

    const entries = Array.from(userStats.entries())
      .map(([userId, stats]) => {
        const completedItems = stats.completedTopics + stats.completedProjects;
        const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        return { userId, progress, totalMinutes: stats.totalMinutes };
      })
      .sort((a, b) => b.progress - a.progress || b.totalMinutes - a.totalMinutes);

    const rank = entries.findIndex((e) => e.userId === args.userId) + 1;
    const userEntry = entries.find((e) => e.userId === args.userId);

    return {
      rank: rank || null,
      total: entries.length,
      progress: userEntry?.progress ?? 0,
    };
  },
});
