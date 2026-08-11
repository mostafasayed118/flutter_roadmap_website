import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireUser } from "./lib/auth";

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
}

export const ALL_BADGES: BadgeDefinition[] = [
  {
    id: "first-step",
    title: "First Step",
    description: "Complete your first topic",
    icon: "footprints",
    condition: "1 topic completed",
  },
  {
    id: "week-warrior",
    title: "Week Warrior",
    description: "Complete an entire week",
    icon: "trophy",
    condition: "1 week completed",
  },
  {
    id: "five-weeks",
    title: "Momentum Builder",
    description: "Complete 5 weeks",
    icon: "flame",
    condition: "5 weeks completed",
  },
  {
    id: "half-way",
    title: "Halfway Hero",
    description: "Complete 50% of the roadmap",
    icon: "target",
    condition: "50% progress",
  },
  {
    id: "dart-master",
    title: "Dart Master",
    description: "Complete all Dart topics (Phase 1)",
    icon: "code",
    condition: "Phase 1 completed",
  },
  {
    id: "flutter-foundation",
    title: "Flutter Foundation",
    description: "Complete all Flutter topics (Phase 2)",
    icon: "smartphone",
    condition: "Phase 2 completed",
  },
  {
    id: "state-guru",
    title: "State Guru",
    description: "Complete all Bloc/Cubit topics (Phase 3)",
    icon: "layers",
    condition: "Phase 3 completed",
  },
  {
    id: "firebase-explorer",
    title: "Firebase Explorer",
    description: "Complete all Firebase topics (Phase 9)",
    icon: "flame",
    condition: "Phase 9 completed",
  },
  {
    id: "ten-hours",
    title: "Dedicated Learner",
    description: "Study for 10+ hours total",
    icon: "clock",
    condition: "10 hours studied",
  },
  {
    id: "fifty-hours",
    title: "Deep Diver",
    description: "Study for 50+ hours total",
    icon: "hourglass",
    condition: "50 hours studied",
  },
  {
    id: "hundred-hours",
    title: "Centurion",
    description: "Study for 100+ hours total",
    icon: "award",
    condition: "100 hours studied",
  },
  {
    id: "streak-3",
    title: "Consistent",
    description: "Maintain a 3-day streak",
    icon: "zap",
    condition: "3-day streak",
  },
  {
    id: "streak-7",
    title: "Week Streak",
    description: "Maintain a 7-day streak",
    icon: "zap",
    condition: "7-day streak",
  },
  {
    id: "streak-30",
    title: "Unstoppable",
    description: "Maintain a 30-day streak",
    icon: "zap",
    condition: "30-day streak",
  },
  {
    id: "skill-collector",
    title: "Skill Collector",
    description: "Check off 25 skills",
    icon: "check-circle",
    condition: "25 skills checked",
  },
  {
    id: "all-rounder",
    title: "All-Rounder",
    description: "Complete at least 1 topic in every phase",
    icon: "star",
    condition: "All phases started",
  },
  {
    id: "roadmap-complete",
    title: "Roadmap Champion",
    description: "Complete the entire 34-week roadmap",
    icon: "crown",
    condition: "100% completed",
  },
  {
    id: "project-builder",
    title: "Project Builder",
    description: "Add a project to your showcase",
    icon: "folder",
    condition: "1 project showcased",
  },
];

export const getBadges = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUser(ctx);
    const userBadges = await ctx.db
      .query("userBadges")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const unlockedSet = new Set(userBadges.map((b) => b.badgeId));

    return ALL_BADGES.map((badge) => ({
      ...badge,
      unlocked: unlockedSet.has(badge.id),
      unlockedAt: userBadges.find((b) => b.badgeId === badge.id)?.unlockedAt,
    }));
  },
});

export const unlockBadge = mutation({
  args: {
    badgeId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    const existing = await ctx.db
      .query("userBadges")
      .withIndex("by_user_badge", (q) =>
        q.eq("userId", userId).eq("badgeId", args.badgeId)
      )
      .first();

    if (existing) return { alreadyUnlocked: true };

    await ctx.db.insert("userBadges", {
      userId,
      badgeId: args.badgeId,
      unlockedAt: Date.now(),
    });

    return { alreadyUnlocked: false, unlockedAt: Date.now() };
  },
});

export const getUnlockedCount = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUser(ctx);
    const userBadges = await ctx.db
      .query("userBadges")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    return {
      unlocked: userBadges.length,
      total: ALL_BADGES.length,
    };
  },
});
