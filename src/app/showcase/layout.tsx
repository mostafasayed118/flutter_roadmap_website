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

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
