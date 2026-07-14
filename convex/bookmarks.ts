import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getBookmarks = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("userBookmarks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const toggleBookmark = mutation({
  args: {
    userId: v.string(),
    weekId: v.id("roadmapWeeks"),
    topicIndex: v.number(),
    topicTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userBookmarks")
      .withIndex("by_user_week", (q) =>
        q.eq("userId", args.userId).eq("weekId", args.weekId)
      )
      .collect();

    const match = existing.find((b) => b.topicIndex === args.topicIndex);

    if (match) {
      await ctx.db.delete(match._id);
      return { bookmarked: false };
    }

    await ctx.db.insert("userBookmarks", {
      userId: args.userId,
      weekId: args.weekId,
      topicIndex: args.topicIndex,
      topicTitle: args.topicTitle,
      createdAt: Date.now(),
    });
    return { bookmarked: true };
  },
});

export const updateBookmarkNote = mutation({
  args: {
    bookmarkId: v.id("userBookmarks"),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    const MAX_NOTE = 1000;
    const note = args.note.length > MAX_NOTE ? args.note.slice(0, MAX_NOTE) : args.note;
    await ctx.db.patch(args.bookmarkId, { note });
  },
});
