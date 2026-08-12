import type { QueryCtx, MutationCtx } from "../_generated/server";

/**
 * The legacy fixed dataset key, kept for the one-time migrations
 * (`reassignLegacyUser` / `mergePerUserRows`) and the seed script.
 * Runtime handlers no longer use it — see `requireUser`.
 */
export const SINGLE_USER_KEY = "test-user-123";

/**
 * Enforces the single-user design:
 *
 * 1. Requires a valid Clerk session (the public Convex API stays closed to
 *    anonymous callers).
 * 2. Requires the caller's Clerk `subject` to be in the allowlist
 *    (`ALLOWED_USER_IDS`, comma-separated, set on the Convex deployment).
 *    Fails closed — if the allowlist isn't configured, no one gets in.
 * 3. Returns the caller's real Clerk `subject`, so each allowlisted identity
 *    reads and writes only its own rows. Rows written under the legacy
 *    `test-user-123` key must be re-keyed first via the reassign/merge
 *    migrations, or they become invisible.
 */
export async function requireUser(
  ctx: QueryCtx | MutationCtx,
): Promise<string> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }

  const allowed = (process.env.ALLOWED_USER_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) {
    throw new Error(
      "ALLOWED_USER_IDS is not configured in the Convex deployment",
    );
  }
  if (!allowed.includes(identity.subject)) {
    throw new Error("Not authorized: user is not in the allowlist");
  }

  return identity.subject;
}
