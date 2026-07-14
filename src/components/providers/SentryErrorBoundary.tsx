"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

export function SentryErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Sentry.setTag("app.section", "flutter-roadmap");
  }, []);

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
