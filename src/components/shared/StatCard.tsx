"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  sublabel?: string;
  color?: "default" | "accent" | "money-in" | "money-out";
  delay?: number;
}

export function StatCard({ label, value, sublabel, color = "default", delay = 0 }: StatCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const colorClasses = {
    default: "text-ink",
    accent: "text-accent",
    "money-in": "text-money-in",
    "money-out": "text-money-out",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
        {label}
      </div>
      <div className={cn("mt-1 font-headline text-5xl font-black tracking-tight lg:text-6xl", colorClasses[color])}>
        {value}
      </div>
      {sublabel && (
        <div className="mt-1 text-sm text-muted">{sublabel}</div>
      )}
    </div>
  );
}
