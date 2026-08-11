import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard - Flutter Learning Community",
  description:
    "See how you stack up against other Flutter learners. Track streaks, completed topics, and community progress.",
  openGraph: {
    title: "Leaderboard - Flutter Learning Community",
    description:
      "See how you stack up against other Flutter learners.",
    type: "website",
  },
};

export default async function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <>{children}</>;
}
