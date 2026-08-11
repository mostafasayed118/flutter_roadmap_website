import { auth } from "@clerk/nextjs/server";
import { LeaderboardView } from "@/components/features/leaderboard/LeaderboardView";

export default async function LeaderboardPage() {
  await auth.protect();

  return <LeaderboardView />;
}
