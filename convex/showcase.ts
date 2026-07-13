import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getProjects = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projectShowcase")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const addProject = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    description: v.string(),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    technologies: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("projectShowcase", {
      userId: args.userId,
      title: args.title,
      description: args.description,
      githubUrl: args.githubUrl,
      liveUrl: args.liveUrl,
      imageUrl: args.imageUrl,
      technologies: args.technologies,
      createdAt: Date.now(),
    });
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projectShowcase"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    technologies: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const patch: Record<string, unknown> = {};
    if (args.title !== undefined) patch.title = args.title;
    if (args.description !== undefined) patch.description = args.description;
    if (args.githubUrl !== undefined) patch.githubUrl = args.githubUrl;
    if (args.liveUrl !== undefined) patch.liveUrl = args.liveUrl;
    if (args.imageUrl !== undefined) patch.imageUrl = args.imageUrl;
    if (args.technologies !== undefined) patch.technologies = args.technologies;
    await ctx.db.patch(args.projectId, patch);
  },
});

export const deleteProject = mutation({
  args: { projectId: v.id("projectShowcase") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.projectId);
  },
});
