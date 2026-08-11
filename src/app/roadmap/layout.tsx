import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flutter Roadmap - 34-Week Learning Path",
  description:
    "Follow a structured 34-week roadmap to master Flutter development. Track your progress through 10 phases covering Dart, Flutter, Bloc, Firebase, and more.",
  openGraph: {
    title: "Flutter Roadmap - 34-Week Learning Path",
    description:
      "Follow a structured 34-week roadmap to master Flutter development.",
    type: "website",
  },
};

export default async function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <>{children}</>;
}
