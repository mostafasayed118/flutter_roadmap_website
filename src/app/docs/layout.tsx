import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Base | Flutter Roadmap",
  description:
    "Comprehensive Flutter, Dart, Bloc, and Firebase documentation with searchable code examples.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
