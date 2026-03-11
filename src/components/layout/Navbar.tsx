"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  Network,
  Search,
  Menu,
  X,
  Columns2,
  BookOpen,
  TrendingUp,
  Trophy,
  Scale,
  Waypoints,
  FileText,
  Globe,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMode } from "@/context/ModeContext";
import { ModeToggle } from "./ModeToggle";
import { SearchBar } from "./SearchBar";

const NAV_ITEMS = {
  explore: [
    { label: "Money Map", href: "/money-flow", icon: BarChart3 },
    { label: "Trades", href: "/trades", icon: TrendingUp },
    { label: "Legislation", href: "/legislation", icon: Scale },
    { label: "Contracts", href: "/contracts", icon: Building2 },
    { label: "Network", href: "/network", icon: Network },
    { label: "Stories", href: "/stories", icon: BookOpen },
    { label: "Search", href: "/search", icon: Search },
  ],
  research: [
    { label: "Money Flow", href: "/money-flow", icon: BarChart3 },
    { label: "Trades", href: "/trades", icon: TrendingUp },
    { label: "Legislation", href: "/legislation", icon: Scale },
    { label: "Power Map", href: "/power-map", icon: Waypoints },
    { label: "Regulations", href: "/regulations", icon: FileText },
    { label: "Foreign Influence", href: "/foreign-influence", icon: Globe },
    { label: "Dark Money", href: "/dark-money", icon: EyeOff },
    { label: "Revolving Door", href: "/revolving-door", icon: RefreshCw },
    { label: "Leaderboards", href: "/leaderboards", icon: Trophy },
    { label: "Contracts", href: "/contracts", icon: Building2 },
    { label: "Network", href: "/network", icon: Network },
    { label: "Compare", href: "/compare", icon: Columns2 },
    { label: "Search", href: "/search", icon: Search },
  ],
};

export function Navbar() {
  const { mode } = useMode();
  const pathname = usePathname();
  const items = NAV_ITEMS[mode];
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b-4 border-ink bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-headline text-2xl font-black tracking-tight text-ink">
            THE LEDGER
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-ink text-white"
                    : "text-muted hover:bg-paper-dark hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Search + Mode Toggle */}
        <div className="flex items-center gap-3">
          <SearchBar />
          <ModeToggle />
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-paper-dark md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav className="border-t border-border bg-paper px-4 pb-4 md:hidden">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-ink text-white"
                    : "text-muted hover:bg-paper-dark hover:text-ink",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
