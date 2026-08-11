import type { QueryCtx, MutationCtx } from "../_generated/server";

/**
 * The fixed single-user dataset key. Every handler scopes all reads and
 * writes to this constant — no visitor, even a signed-in and allowlisted one,
 * ever touches any other rows. This is the documented single-user design,
 * now enforced server-side.
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
 * 3. Returns the fixed `test-user-123` dataset key, so only that user's rows
 *    are ever read or written regardless of which allowlisted identity is
 *    signed in.
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

  return SINGLE_USER_KEY;
}
