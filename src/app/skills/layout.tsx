import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills Checklist - Flutter Development",
  description:
    "Track your mastery across all Flutter development skills. Check off competencies in Dart, Flutter UI, state management, testing, and deployment.",
  openGraph: {
    title: "Skills Checklist - Flutter Development",
    description:
      "Track your mastery across all Flutter development skills.",
    type: "website",
  },
};

export default async function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <>{children}</>;
}
