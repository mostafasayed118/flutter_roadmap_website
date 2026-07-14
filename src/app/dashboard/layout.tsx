import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Flutter Roadmap",
  description: "Track your Flutter learning progress, streaks, and next steps.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
