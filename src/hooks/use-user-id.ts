"use client";

import { useUser } from "@clerk/nextjs";

/**
 * Returns the authenticated user's Clerk ID, or `null` while Clerk is loading
 * or when the visitor is signed out. Hooks use this as the client-side auth
 * gate: queries are skipped (`"skip"`) until a user exists, and mutations are
 * only exposed to signed-in callers.
 *
 * Note: this is a convenience for the UI only. The app is single-user — every
 * handler pins all reads/writes to the fixed `test-user-123` dataset key via
 * `requireUser(ctx)` in `convex/lib/auth.ts`, after checking the Clerk session
 * AND the `ALLOWED_USER_IDS` allowlist. The value here never reaches a
 * handler as a `userId` argument.
 */
export function useUserId(): string | null {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn || !user) return null;
  return user.id;
}
