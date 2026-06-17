import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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
  })
    .index("by_user", ["userId"])
    .index("by_user_week", ["userId", "weekId"]),
});
