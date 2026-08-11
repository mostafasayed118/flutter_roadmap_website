import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireUser } from "./lib/auth";

export const getBookmarks = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUser(ctx);
    return await ctx.db
      .query("userBookmarks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const toggleBookmark = mutation({
  args: {
    weekId: v.id("roadmapWeeks"),
    topicIndex: v.number(),
    topicTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireUser(ctx);
    const existing = await ctx.db
      .query("userBookmarks")
      .withIndex("by_user_week", (q) =>
        q.eq("userId", userId).eq("weekId", args.weekId)
      )
      .collect();

    const match = existing.find((b) => b.topicIndex === args.topicIndex);

    if (match) {
      await ctx.db.delete(match._id);
      return { bookmarked: false };
    }

    await ctx.db.insert("userBookmarks", {
      userId,
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
    const userId = await requireUser(ctx);
    const bookmark = await ctx.db.get(args.bookmarkId);
    if (!bookmark) throw new Error(`Bookmark not found: ${args.bookmarkId}`);
    if (bookmark.userId !== userId) {
      throw new Error("Not authorized to edit this bookmark");
    }

    const MAX_NOTE = 1000;
    const note = args.note.length > MAX_NOTE ? args.note.slice(0, MAX_NOTE) : args.note;
    await ctx.db.patch(args.bookmarkId, { note });
  },
});
