"use client";

import { useRef, useEffect } from "react";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNav({ tabs, activeTab, onTabChange }: TabNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Scroll active tab into view on mount / tab change
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const button = activeRef.current;
      const left = button.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-1 overflow-x-auto border-b border-border"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            ref={isActive ? activeRef : undefined}
            onClick={() => onTabChange(tab.id)}
            className={`relative shrink-0 whitespace-nowrap px-4 py-3 font-mono text-sm transition-colors ${
              isActive
                ? "border-b-2 border-ink font-bold text-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`ml-1.5 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                  isActive
                    ? "bg-ink text-white"
                    : "bg-border text-muted"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
