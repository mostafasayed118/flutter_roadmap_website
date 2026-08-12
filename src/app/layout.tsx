import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

// The app is fully auth-gated (every route calls `auth.protect()` server-side)
// and client hooks like useAuth (via ConvexProviderWithClerk) render under
// <ClerkProvider />. Force-dynamic prevents build-time static prerendering of
// routes such as /_not-found, where Clerk's request-scoped provider context is
// unavailable — previously `next build` failed with "useAuth can only be used
// within the <ClerkProvider /> component".

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#8b5cf6",
};

export const metadata: Metadata = {
  title: "Flutter Roadmap Progress Tracker",
  description: "Track your Flutter learning journey across 34 weeks",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Flutter Roadmap",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full overflow-x-hidden">
          <ClientProviders>{children}</ClientProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
