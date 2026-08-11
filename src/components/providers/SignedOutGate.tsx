"use client";

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignIn } from "@clerk/nextjs";
import { ReactNode } from "react";

/**
 * Gates the entire app shell behind authentication. When signed out, shows a
 * centered Clerk sign-in card; the app (and its Convex queries/mutations)
 * only render for authenticated users.
 */
export function SignedOutGate({ children }: { children: ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">FlutterPath</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to track your Flutter learning journey.
              </p>
            </div>
            <SignIn />
          </div>
        </div>
      </SignedOut>
    </>
  );
}
