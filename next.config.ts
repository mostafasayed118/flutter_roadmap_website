import type { NextConfig } from "next";
import withPWAInit from "next-pwa";
import { withSentryConfig } from "@sentry/nextjs";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withSentryConfig(withPWA(nextConfig), {
  org: "al3tar",
  project: "javascript-nextjs-ih",

  widenClientFileUpload: true,

  tunnelRoute: "/monitoring",

  silent: !process.env.CI,
});
