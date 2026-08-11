import { mutation } from "../_generated/server";
import { SINGLE_USER_KEY } from "../lib/auth";

/**
 * Tables that carry per-user rows (all keyed by the `userId` field). The
 * roadmap content tables (`roadmapPhases`, `roadmapWeeks`) are global and
 * have no owner, so they're intentionally not touched.
 */
const USER_TABLES = [
  "userProgress",
  "skillsChecklist",
  "studySessions",
  "userStreaks",
  "userGoals",
  "userBookmarks",
  "userBadges",
  "projectShowcase",
] as const;

/**
 * Parses the deployment's `ALLOWED_USER_IDS` allowlist (comma-separated Clerk
 * user IDs). Mirrors the parsing in `convex/lib/auth.ts`.
 */
function parseAllowlist(): string[] {
  return (process.env.ALLOWED_USER_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function unionNumbers(a: number[], b: number[]): number[] {
  return [...new Set([...a, ...b])].sort((x, y) => x - y);
}

/**
 * ONE-TIME MIGRATION — merges intermediate per-user rows (written under real
 * Clerk-subject keys) back into the fixed `test-user-123` dataset.
 *
 * During the auth transition some rows may have been written under an actual
 * Clerk user ID (e.g. after running `reassignLegacyUser`, or while a build
 * briefly keyed rows by the authenticated subject). Since the app pins every
 * read/write to `SINGLE_USER_KEY` (`convex/lib/auth.ts`), those rows are
 * invisible — orphaned. This migration re-keys every such row to
 * `test-user-123`:
 *
 *   npx convex run migrations/mergePerUserRows:mergePerUserRows
 *
 * Rows with no duplicate under `test-user-123` are re-keyed in place. Rows
 * that collide with an existing `test-user-123` row are merged (progress
 * checklists are unioned, streaks take the best values, bookmarks/badges/goals
 * keep the existing row) and the intermediate copy is deleted.
 *
 * It is **idempotent**: once no non-`test-user-123` rows remain, re-running it
 * is a no-op (`alreadyMerged: true`). Browser callers must be allowlisted; the
 * CLI/admin path (`npx convex run`) is already privileged.
 */
export const mergePerUserRows = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity) {
      const allowed = parseAllowlist();
      if (!allowed.includes(identity.subject)) {
        throw new Error("Not authorized: user is not in the allowlist");
      }
    }

    const stats: Record<string, { rekeyed: number; merged: number }> = {};
    let total = 0;

    for (const table of USER_TABLES) {
      stats[table] = { rekeyed: 0, merged: 0 };
    }

    // ── userProgress: one row per week; union topic/project checklists ──────
    for (const row of await ctx.db
      .query("userProgress")
      .filter((q) => q.neq(q.field("userId"), SINGLE_USER_KEY))
      .collect()) {
      const existing = await ctx.db
        .query("userProgress")
        .withIndex("by_user_week", (q) =>
          q.eq("userId", SINGLE_USER_KEY).eq("weekId", row.weekId),
        )
        .first();
      if (!existing) {
        await ctx.db.patch(row._id, { userId: SINGLE_USER_KEY });
        stats.userProgress.rekeyed++;
      } else {
        await ctx.db.patch(existing._id, {
          completedTopics: unionNumbers(existing.completedTopics, row.completedTopics),
          completedProjects: unionNumbers(
            existing.completedProjects,
            row.completedProjects,
          ),
          notes: existing.notes ?? row.notes,
        });
        await ctx.db.delete(row._id);
        stats.userProgress.merged++;
      }
      total++;
    }

    // ── skillsChecklist: one row per category; union items by name ──────────
    for (const row of await ctx.db
      .query("skillsChecklist")
      .filter((q) => q.neq(q.field("userId"), SINGLE_USER_KEY))
      .collect()) {
      const existing = await ctx.db
        .query("skillsChecklist")
        .withIndex("by_user_category", (q) =>
          q.eq("userId", SINGLE_USER_KEY).eq("category", row.category),
        )
        .first();
      if (!existing) {
        await ctx.db.patch(row._id, { userId: SINGLE_USER_KEY });
        stats.skillsChecklist.rekeyed++;
      } else {
        const mergedItems = new Map<string, boolean>();
        for (const item of [...existing.items, ...row.items]) {
          mergedItems.set(item.name, mergedItems.get(item.name)! || item.completed);
        }
        await ctx.db.patch(existing._id, {
          items: [...mergedItems].map(([name, completed]) => ({ name, completed })),
        });
        await ctx.db.delete(row._id);
        stats.skillsChecklist.merged++;
      }
      total++;
    }

    // ── studySessions: event rows, no natural key — re-key in place ─────────
    for (const row of await ctx.db
      .query("studySessions")
      .filter((q) => q.neq(q.field("userId"), SINGLE_USER_KEY))
      .collect()) {
      await ctx.db.patch(row._id, { userId: SINGLE_USER_KEY });
      stats.studySessions.rekeyed++;
      total++;
    }

    // ── userStreaks: one row per user; keep the best of both ────────────────
    for (const row of await ctx.db
      .query("userStreaks")
      .filter((q) => q.neq(q.field("userId"), SINGLE_USER_KEY))
      .collect()) {
      const existing = await ctx.db
        .query("userStreaks")
        .withIndex("by_user", (q) => q.eq("userId", SINGLE_USER_KEY))
        .first();
      if (!existing) {
        await ctx.db.patch(row._id, { userId: SINGLE_USER_KEY });
        stats.userStreaks.rekeyed++;
      } else {
        await ctx.db.patch(existing._id, {
          currentStreak: Math.max(existing.currentStreak, row.currentStreak),
          longestStreak: Math.max(existing.longestStreak, row.longestStreak),
          lastStudyDate: Math.max(existing.lastStudyDate, row.lastStudyDate),
          streakStartDate: Math.min(existing.streakStartDate, row.streakStartDate),
        });
        await ctx.db.delete(row._id);
        stats.userStreaks.merged++;
      }
      total++;
    }

    // ── userGoals: one row per (weekNumber, year) — keep the existing ───────
    for (const row of await ctx.db
      .query("userGoals")
      .filter((q) => q.neq(q.field("userId"), SINGLE_USER_KEY))
      .collect()) {
      const existing = await ctx.db
        .query("userGoals")
        .withIndex("by_user_week", (q) =>
          q
            .eq("userId", SINGLE_USER_KEY)
            .eq("weekNumber", row.weekNumber)
            .eq("year", row.year),
        )
        .first();
      if (!existing) {
        await ctx.db.patch(row._id, { userId: SINGLE_USER_KEY });
        stats.userGoals.rekeyed++;
      } else {
        await ctx.db.delete(row._id);
        stats.userGoals.merged++;
      }
      total++;
    }

    // ── userBookmarks: one row per (weekId, topicIndex) — keep the existing ─
    for (const row of await ctx.db
      .query("userBookmarks")
      .filter((q) => q.neq(q.field("userId"), SINGLE_USER_KEY))
      .collect()) {
      const existing = await ctx.db
        .query("userBookmarks")
        .withIndex("by_user_week", (q) =>
          q.eq("userId", SINGLE_USER_KEY).eq("weekId", row.weekId),
        )
        .filter((q) => q.eq(q.field("topicIndex"), row.topicIndex))
        .first();
      if (!existing) {
        await ctx.db.patch(row._id, { userId: SINGLE_USER_KEY });
        stats.userBookmarks.rekeyed++;
      } else {
        await ctx.db.delete(row._id);
        stats.userBookmarks.merged++;
      }
      total++;
    }

    // ── userBadges: one row per badge — keep the earliest unlock ────────────
    for (const row of await ctx.db
      .query("userBadges")
      .filter((q) => q.neq(q.field("userId"), SINGLE_USER_KEY))
      .collect()) {
      const existing = await ctx.db
        .query("userBadges")
        .withIndex("by_user_badge", (q) =>
          q.eq("userId", SINGLE_USER_KEY).eq("badgeId", row.badgeId),
        )
        .first();
      if (!existing) {
        await ctx.db.patch(row._id, { userId: SINGLE_USER_KEY });
        stats.userBadges.rekeyed++;
      } else {
        await ctx.db.patch(existing._id, {
          unlockedAt: Math.min(existing.unlockedAt, row.unlockedAt),
        });
        await ctx.db.delete(row._id);
        stats.userBadges.merged++;
      }
      total++;
    }

    // ── projectShowcase: entry rows, no natural key — re-key in place ───────
    for (const row of await ctx.db
      .query("projectShowcase")
      .filter((q) => q.neq(q.field("userId"), SINGLE_USER_KEY))
      .collect()) {
      await ctx.db.patch(row._id, { userId: SINGLE_USER_KEY });
      stats.projectShowcase.rekeyed++;
      total++;
    }

    return {
      migrated: true,
      alreadyMerged: total === 0,
      target: SINGLE_USER_KEY,
      total,
      stats,
    };
  },
});
