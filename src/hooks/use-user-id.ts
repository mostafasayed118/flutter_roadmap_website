/**
 * Returns the identifier of "the current user".
 *
 * ⚠️ SECURITY NOTE — SINGLE-USER BY DESIGN:
 *
 * This app has NO authentication. Every visitor is treated as the same
 * user (`"test-user-123"`), and every Convex query/mutation accepts the
 * `userId` as a client-supplied argument and trusts it server-side. Anyone
 * who can reach the Convex API can pass any `userId` and read or mutate
 * that user's data.
 *
 * This is intentional for a personal learning tracker — see the
 * "Security Model" section in the project README before deploying
 * publicly or storing real user data.
 */
export function useUserId(): string {
  return "test-user-123";
}
