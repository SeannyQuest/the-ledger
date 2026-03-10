"use client";

import { useMode } from "@/context/ModeContext";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { mode, toggleMode } = useMode();

  return (
    <button
      onClick={toggleMode}
      className="relative flex h-8 items-center rounded-full border border-border bg-surface p-0.5 text-xs font-medium tracking-wider uppercase transition-colors"
      aria-label={`Switch to ${mode === "explore" ? "research" : "explore"} mode`}
    >
      <span
        className={cn(
          "relative z-10 px-3 py-1 transition-colors duration-200",
          mode === "explore" ? "text-white" : "text-muted"
        )}
      >
        Explore
      </span>
      <span
        className={cn(
          "relative z-10 px-3 py-1 transition-colors duration-200",
          mode === "research" ? "text-white" : "text-muted"
        )}
      >
        Research
      </span>
      <span
        className={cn(
          "absolute top-0.5 h-7 rounded-full bg-ink transition-all duration-300 ease-out",
          mode === "explore" ? "left-0.5 w-[72px]" : "left-[74px] w-[80px]"
        )}
      />
    </button>
  );
}
