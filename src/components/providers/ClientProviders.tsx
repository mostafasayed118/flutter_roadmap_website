"use client";

import { ReactNode } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ConvexClientProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col min-w-0">
              <TopNavbar />
              <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 lg:p-8">
                <div className="mx-auto w-full max-w-7xl">
                  {children}
                </div>
              </main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ErrorBoundary>
      </TooltipProvider>
    </ConvexClientProvider>
  );
}
