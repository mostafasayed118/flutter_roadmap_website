import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flutter Roadmap Progress Tracker",
  description: "Track your Flutter learning journey across 34 weeks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full overflow-x-hidden">
        <ConvexClientProvider>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="flex flex-col min-w-0">
                <TopNavbar />
                <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 lg:p-8">
                  <div className="mx-auto max-w-7xl w-full">
                    {children}
                  </div>
                </main>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
