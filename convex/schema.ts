import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * 🔐 SECURITY NOTE — SINGLE-USER, AUTHENTICATED:
 *
 * This is a single-user app: every row's `userId` is the fixed dataset key
 * `"test-user-123"`, returned by `requireUser(ctx)` in every handler after
 * verifying a Clerk session AND membership in the `ALLOWED_USER_IDS`
 * allowlist. No client-supplied `userId` is ever trusted. ID-based mutations
 * (sessions, bookmarks, showcase projects) additionally verify row ownership
 * before patching/deleting.
 */
export default defineSchema({
  roadmapPhases: defineTable({
    order: v.number(),
    title: v.string(),
    duration: v.string(),
    period: v.string(),
  }).index("by_order", ["order"]),

  roadmapWeeks: defineTable({
    phaseId: v.id("roadmapPhases"),
    order: v.number(),
    title: v.string(),
    estimatedHours: v.string(),
    topics: v.array(v.string()),
    projects: v.array(v.string()),
    integratedCourses: v.optional(
      v.array(
        v.object({
          title: v.string(),
          url: v.string(),
          description: v.string(),
        })
      )
    ),
  })
    .index("by_phase", ["phaseId"])
    .index("by_phase_order", ["phaseId", "order"]),

  userProgress: defineTable({
    userId: v.string(),
    weekId: v.id("roadmapWeeks"),
    completedTopics: v.array(v.number()),
    completedProjects: v.array(v.number()),
    notes: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_week", ["userId", "weekId"]),

  skillsChecklist: defineTable({
    userId: v.string(),
    category: v.string(),
    items: v.array(
      v.object({
        name: v.string(),
        completed: v.boolean(),
      })
    ),
  })
    .index("by_user", ["userId"])
    .index("by_user_category", ["userId", "category"]),

  studySessions: defineTable({
    userId: v.string(),
    weekId: v.optional(v.id("roadmapWeeks")),
    durationMinutes: v.number(),
    date: v.number(),
    notes: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
  })
    .index("by_user", ["userId"])
    .index("by_user_week", ["userId", "weekId"]),

  // NEW: Streak tracking
  userStreaks: defineTable({
    userId: v.string(),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastStudyDate: v.number(),
    streakStartDate: v.number(),
  }).index("by_user", ["userId"]),

  // NEW: Weekly goals
  userGoals: defineTable({
    userId: v.string(),
    weekNumber: v.number(),
    targetHours: v.number(),
    targetTopics: v.number(),
    year: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_week", ["userId", "weekNumber", "year"]),

  // NEW: Bookmarks / favorites
  userBookmarks: defineTable({
    userId: v.string(),
    weekId: v.id("roadmapWeeks"),
    topicIndex: v.number(),
    topicTitle: v.string(),
    note: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_week", ["userId", "weekId"]),

  // NEW: Badges / milestones
  userBadges: defineTable({
    userId: v.string(),
    badgeId: v.string(),
    unlockedAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_user_badge", ["userId", "badgeId"]),

  // NEW: Project showcase
  projectShowcase: defineTable({
    userId: v.string(),
    title: v.string(),
    description: v.string(),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    technologies: v.array(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
