"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  CheckSquare,
  BarChart3,
  Menu,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/skills", label: "Skills", icon: CheckSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl safe-area-bottom md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const normalizedPath = pathname.replace(/\/+$/, "") || "/";
          const isActive = normalizedPath === item.href || normalizedPath.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-all duration-200",
                isActive
                  ? "text-violet-400"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("size-5", isActive && "drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 size-1 rounded-full bg-violet-400" />
              )}
            </Link>
          );
        })}
        <button
          onClick={() => {
            const event = new CustomEvent("toggle-sidebar");
            window.dispatchEvent(event);
          }}
          className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-muted-foreground transition-all duration-200 hover:text-foreground"
        >
          <Menu className="size-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </div>
    </nav>
  );
}
