import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics - Flutter Roadmap",
  description: "View your study time, sessions, goals, badges, and progress charts.",
};

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
