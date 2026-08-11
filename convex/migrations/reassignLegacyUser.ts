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

/**
 * ONE-TIME MIGRATION — re-assigns the legacy fixed-key dataset to the first
 * authenticated user.
 *
 * Before authentication was introduced, every row was written under the
 * constant `test-user-123` (see `convex/lib/auth.ts`). When the app moves to
 * real per-user IDs, those rows would be orphaned. This migration re-keys
 * every legacy row to the **first user in the `ALLOWED_USER_IDS` allowlist** —
 * in this single-user app, that entry is the app's owner, i.e. the first
 * (and usually only) user who can authenticate.
 *
 * Run it once after configuring the allowlist:
 *
 *   npx convex run migrations/reassignLegacyUser:reassignLegacyUser
 *
 * It is **idempotent**: once no `test-user-123` rows remain, re-running it is
 * a no-op and reports `alreadyMigrated: true`.
 *
 * Security: the public API stays closed. If the call carries a Clerk identity
 * (i.e. it comes from a browser session), the caller must be allowlisted. The
 * CLI/admin path (`npx convex run`) has no identity and is already privileged.
 * The migration also fails closed if `ALLOWED_USER_IDS` is unset, so it can
 * never guess a target.
 */
export const reassignLegacyUser = mutation({
  args: {},
  handler: async (ctx) => {
    const allowed = parseAllowlist();
    if (allowed.length === 0) {
      throw new Error(
        "ALLOWED_USER_IDS is not configured in the Convex deployment — refusing to guess a target user",
      );
    }
    const target = allowed[0];

    const identity = await ctx.auth.getUserIdentity();
    if (identity && !allowed.includes(identity.subject)) {
      throw new Error("Not authorized: user is not in the allowlist");
    }

    const stats: Record<string, number> = {};
    let total = 0;

    for (const table of USER_TABLES) {
      const rows = await ctx.db
        .query(table)
        .filter((q) => q.eq(q.field("userId"), SINGLE_USER_KEY))
        .collect();

      for (const row of rows) {
        await ctx.db.patch(row._id, { userId: target });
      }

      stats[table] = rows.length;
      total += rows.length;
    }

    return {
      migrated: true,
      alreadyMigrated: total === 0,
      target,
      total,
      stats,
    };
  },
});
