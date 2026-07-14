import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Base - Flutter, Dart, Bloc & Firebase Docs",
  description:
    "Comprehensive Flutter, Dart, Bloc, and Firebase documentation with interactive code examples. Searchable reference for all skill levels.",
  openGraph: {
    title: "Knowledge Base - Flutter, Dart, Bloc & Firebase Docs",
    description:
      "Comprehensive Flutter, Dart, Bloc, and Firebase documentation with interactive code examples.",
    type: "website",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
