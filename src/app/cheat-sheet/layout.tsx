import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flutter Cheat Sheet - Quick Reference",
  description:
    "Quick reference cards for Dart, Flutter, Bloc/Cubit, Firebase, and deployment. Copy-paste ready code snippets and commands.",
  openGraph: {
    title: "Flutter Cheat Sheet - Quick Reference",
    description:
      "Quick reference cards for Dart, Flutter, Bloc/Cubit, Firebase, and deployment.",
    type: "website",
  },
};

export default async function CheatSheetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth.protect();

  return <>{children}</>;
}
