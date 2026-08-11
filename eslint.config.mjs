import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import clerk from "@clerk/eslint-plugin/next";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "@clerk/next": clerk,
    },
    rules: {
      "@clerk/next/require-auth-protection": [
        "error",
        {
          // Every App Router resource is protected unless explicitly listed.
          protected: ["**"],
          // Root folder is public: the root layout only wires providers and
          // the root page is a redirect to /dashboard. The sign-in page is
          // public so auth.protect() redirects land somewhere real.
          public: ["src/app", "src/app/sign-in/**"],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated code — not authored, not linted.
    "convex/_generated/**",
  ]),
]);

export default eslintConfig;
