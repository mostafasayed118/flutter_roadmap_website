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

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
