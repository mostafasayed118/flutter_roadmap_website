"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SentryErrorBoundary } from "./SentryErrorBoundary";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { StudyTimerProvider } from "@/components/features/time-tracker/StudyTimerProvider";
import { FocusMode } from "@/components/features/time-tracker/FocusMode";
import { KeyboardShortcutsProvider } from "./KeyboardShortcutsProvider";
import { OnboardingFlow } from "@/components/features/onboarding/OnboardingFlow";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { SrAnnouncer } from "@/components/ui/sr-announcer";
import { OfflineIndicator } from "@/components/ui/offline-indicator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ConvexClientProvider>
        <StudyTimerProvider>
          <KeyboardShortcutsProvider>
            <TooltipProvider>
              <SentryErrorBoundary>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset className="flex flex-col min-w-0">
                    <TopNavbar />
                    <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
                      <div className="mx-auto w-full max-w-7xl">
                        {children}
                      </div>
                    </main>
                  </SidebarInset>
                  <MobileNav />
                </SidebarProvider>
                <FocusMode />
                <OfflineIndicator />
                <OnboardingFlow />
                <SrAnnouncer />
                <Toaster />
              </SentryErrorBoundary>
            </TooltipProvider>
          </KeyboardShortcutsProvider>
        </StudyTimerProvider>
      </ConvexClientProvider>
    </ThemeProvider>
  );
}
