import { auth } from "@clerk/nextjs/server";
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

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <>{children}</>;
}
