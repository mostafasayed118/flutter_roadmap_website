import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Flutter Learning Materials",
  description:
    "Curated learning materials, tools, courses, and references for your Flutter development journey.",
  openGraph: {
    title: "Resources - Flutter Learning Materials",
    description:
      "Curated learning materials, tools, courses, and references for your Flutter development journey.",
    type: "website",
  },
};

export default async function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <>{children}</>;
}
