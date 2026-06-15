import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getSkills = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("skillsChecklist")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return existing.map((s) => ({
      _id: s._id,
      category: s.category,
      items: s.items,
    }));
  },
});

export const initSkills = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("skillsChecklist")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    if (existing.length > 0) return { message: "Already initialized" };

    const defaultSkills = [
      {
        category: "Dart",
        items: [
          { name: "Write clean, null-safe Dart code", completed: false },
          { name: "Use OOP principles effectively", completed: false },
          { name: "Handle async operations (Future, Stream)", completed: false },
          { name: "Use generics and extensions", completed: false },
          { name: "Handle errors properly", completed: false },
        ],
      },
      {
        category: "Flutter UI",
        items: [
          { name: "Build complex, responsive layouts", completed: false },
          { name: "Create custom widgets", completed: false },
          { name: "Implement animations", completed: false },
          { name: "Theme and style applications", completed: false },
          { name: "Handle navigation (go_router)", completed: false },
        ],
      },
      {
        category: "State Management",
        items: [
          { name: "Manage state with Cubit", completed: false },
          { name: "Handle complex state scenarios", completed: false },
          { name: "Use BlocBuilder, BlocListener, BlocConsumer", completed: false },
          { name: "Implement Bloc (event-driven)", completed: false },
          { name: "Test Cubits/Blocs", completed: false },
        ],
      },
      {
        category: "Networking",
        items: [
          { name: "Make API calls with Dio", completed: false },
          { name: "Handle JSON serialization", completed: false },
          { name: "Implement authentication flow", completed: false },
          { name: "Handle errors & loading states", completed: false },
          { name: "Implement pagination", completed: false },
        ],
      },
      {
        category: "Data Storage",
        items: [
          { name: "Use SharedPreferences", completed: false },
          { name: "Work with SQLite/Hive", completed: false },
          { name: "Implement offline-first approach", completed: false },
          { name: "Secure storage for tokens", completed: false },
        ],
      },
      {
        category: "Architecture",
        items: [
          { name: "Implement Clean Architecture", completed: false },
          { name: "Use Repository Pattern", completed: false },
          { name: "Apply SOLID principles", completed: false },
          { name: "Use Dependency Injection", completed: false },
          { name: "Write maintainable code", completed: false },
        ],
      },
      {
        category: "Testing",
        items: [
          { name: "Write unit tests", completed: false },
          { name: "Write widget tests", completed: false },
          { name: "Test Cubits with bloc_test", completed: false },
          { name: "Mock dependencies", completed: false },
          { name: "Set up CI/CD", completed: false },
        ],
      },
      {
        category: "Firebase",
        items: [
          { name: "Authentication", completed: false },
          { name: "Cloud Firestore", completed: false },
          { name: "Storage", completed: false },
          { name: "Cloud Messaging", completed: false },
          { name: "Analytics & Crashlytics", completed: false },
        ],
      },
      {
        category: "Deployment",
        items: [
          { name: "Deploy to Google Play Store", completed: false },
          { name: "Deploy to App Store", completed: false },
          { name: "CI/CD pipeline", completed: false },
        ],
      },
    ];

    for (const cat of defaultSkills) {
      await ctx.db.insert("skillsChecklist", {
        userId: args.userId,
        category: cat.category,
        items: cat.items,
      });
    }

    return { message: "Skills initialized" };
  },
});

export const toggleSkill = mutation({
  args: { userId: v.string(), category: v.string(), itemIndex: v.number() },
  handler: async (ctx, args) => {
    const target = await ctx.db
      .query("skillsChecklist")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("category"), args.category))
      .first();

    if (!target) throw new Error("Category not found");

    if (args.itemIndex < 0 || args.itemIndex >= target.items.length) {
      throw new Error(`Invalid item index: ${args.itemIndex}. Must be 0–${target.items.length - 1}`);
    }

    const items = target.items.map((item, i) => {
      if (i === args.itemIndex) {
        return { name: item.name, completed: !item.completed };
      }
      return item;
    });

    await ctx.db.patch(target._id, { items });
  },
});
