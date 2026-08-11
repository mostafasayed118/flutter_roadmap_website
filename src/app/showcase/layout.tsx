import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Showcase - Flutter Portfolio",
  description:
    "Browse Flutter project examples and portfolio pieces. Get inspired by real-world applications built with Flutter.",
  openGraph: {
    title: "Project Showcase - Flutter Portfolio",
    description:
      "Browse Flutter project examples and portfolio pieces.",
    type: "website",
  },
};

export default async function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <>{children}</>;
}
