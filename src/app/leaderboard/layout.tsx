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

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
