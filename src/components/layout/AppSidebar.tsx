"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Map,
  CheckSquare,
  BookOpen,
  Terminal,
  Flame,
  FileText,
  Trophy,
  Folder,
  BarChart3,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/skills", label: "Skills Checklist", icon: CheckSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/docs", label: "Knowledge Base", icon: FileText },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/cheat-sheet", label: "Cheat Sheet", icon: Terminal },
  { href: "/showcase", label: "Project Showcase", icon: Folder },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background/80 backdrop-blur-xl">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 transition-transform duration-200 hover:scale-105">
                <Flame className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  Flutter Roadmap
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Progress Tracker
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const normalizedPath = pathname.replace(/\/+$/, "") || "/";
              const isActive = normalizedPath === item.href || normalizedPath.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.label}
                    render={<Link href={item.href} />}
                    className={`transition-all duration-200 ${
                      isActive
                        ? "bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-sm shadow-violet-500/10"
                        : "hover:bg-muted/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2 text-xs text-muted-foreground">
          34-Week Flutter Roadmap
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
