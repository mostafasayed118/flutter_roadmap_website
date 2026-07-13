import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Note: Turbopack dev source maps may show "Map has no mappings field" warnings in Lighthouse.
  // Production builds generate valid source maps. This is safe to ignore.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
