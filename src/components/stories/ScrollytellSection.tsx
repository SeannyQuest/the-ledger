"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface ScrollytellStep {
  id: string;
  title: string;
  body: string;
  stat?: { value: string; label: string; color?: string };
  highlightColor?: string;
}

export interface ScrollytellSectionProps {
  headline: string;
  subhead: string;
  steps: ScrollytellStep[];
  bgColor?: string;
  textColor?: string;
}

export function ScrollytellSection({
  headline,
  subhead,
  steps,
  bgColor = "bg-paper",
  textColor = "text-ink",
}: ScrollytellSectionProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setStepRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setActiveStepIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => observerRef.current?.disconnect();
  }, [steps.length]);

  const activeStep = steps[activeStepIndex];
  const isDark = bgColor.includes("ink") || bgColor.includes("dark");

  return (
    <section className={cn(bgColor, textColor, "relative")}>
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-12 lg:px-8">
        <div
          className={cn(
            "font-mono text-xs font-bold uppercase tracking-[0.3em]",
            isDark ? "text-accent-light" : "text-accent"
          )}
        >
          Investigation
        </div>
        <h2 className="mt-4 max-w-3xl font-headline text-4xl font-black tracking-tight lg:text-5xl">
          {headline}
        </h2>
        <p
          className={cn(
            "mt-4 max-w-xl text-lg",
            isDark ? "text-white/60" : "text-muted"
          )}
        >
          {subhead}
        </p>
      </div>

      {/* Scrollytelling container */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative md:grid md:grid-cols-12 md:gap-12">
          {/* Sticky visualization panel — left side */}
          <div className="hidden md:col-span-5 md:block">
            <div className="sticky top-20 pb-24">
              <div
                className={cn(
                  "flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border p-12 transition-all duration-700",
                  isDark
                    ? "border-white/10 bg-white/5"
                    : "border-border bg-surface"
                )}
              >
                {/* Step indicator */}
                <div className="mb-8 flex items-center gap-2">
                  {steps.map((step, i) => (
                    <div
                      key={step.id}
                      className={cn(
                        "h-2 rounded-full transition-all duration-500",
                        i === activeStepIndex
                          ? "w-8 bg-accent"
                          : cn(
                              "w-2",
                              isDark ? "bg-white/20" : "bg-border"
                            )
                      )}
                    />
                  ))}
                </div>

                {/* Stat display */}
                {activeStep?.stat ? (
                  <div
                    key={activeStep.id}
                    className="text-center transition-all duration-700"
                  >
                    <div
                      className={cn(
                        "font-headline text-7xl font-black tracking-tight transition-all duration-700 lg:text-8xl",
                        activeStep.stat.color
                          ? `text-${activeStep.stat.color}`
                          : isDark
                            ? "text-white"
                            : "text-ink"
                      )}
                      style={
                        activeStep.stat.color?.startsWith("#")
                          ? { color: activeStep.stat.color }
                          : undefined
                      }
                    >
                      {activeStep.stat.value}
                    </div>
                    <div
                      className={cn(
                        "mt-3 font-mono text-sm font-bold uppercase tracking-widest",
                        isDark ? "text-white/50" : "text-muted"
                      )}
                    >
                      {activeStep.stat.label}
                    </div>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "font-headline text-3xl font-bold transition-all duration-700",
                      isDark ? "text-white/80" : "text-ink"
                    )}
                  >
                    {activeStep?.title}
                  </div>
                )}

                {/* Step title below stat */}
                {activeStep?.stat && (
                  <div
                    className={cn(
                      "mt-8 border-t pt-6 text-center",
                      isDark ? "border-white/10" : "border-border"
                    )}
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                      Step {activeStepIndex + 1} of {steps.length}
                    </div>
                    <div
                      className={cn(
                        "mt-2 font-headline text-xl font-bold",
                        isDark ? "text-white" : "text-ink"
                      )}
                    >
                      {activeStep.title}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrolling text steps — right side */}
          <div className="md:col-span-7">
            <div className="space-y-8 pb-24 md:space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  ref={setStepRef(i)}
                  className={cn(
                    "transition-all duration-700 md:min-h-[70vh] md:flex md:items-center",
                    i === activeStepIndex
                      ? "opacity-100"
                      : "opacity-30 md:opacity-20"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-xl border p-8 md:p-10",
                      isDark
                        ? "border-white/10 bg-white/5"
                        : "border-border bg-surface",
                      i === activeStepIndex && "shadow-lg",
                      step.highlightColor &&
                        i === activeStepIndex &&
                        `border-l-4`
                    )}
                    style={
                      step.highlightColor && i === activeStepIndex
                        ? { borderLeftColor: step.highlightColor }
                        : undefined
                    }
                  >
                    {/* Mobile stat display */}
                    {step.stat && (
                      <div className="mb-6 md:hidden">
                        <div
                          className={cn(
                            "font-headline text-5xl font-black tracking-tight",
                            step.stat.color
                              ? `text-${step.stat.color}`
                              : isDark
                                ? "text-white"
                                : "text-ink"
                          )}
                          style={
                            step.stat.color?.startsWith("#")
                              ? { color: step.stat.color }
                              : undefined
                          }
                        >
                          {step.stat.value}
                        </div>
                        <div
                          className={cn(
                            "mt-1 font-mono text-xs font-bold uppercase tracking-widest",
                            isDark ? "text-white/50" : "text-muted"
                          )}
                        >
                          {step.stat.label}
                        </div>
                      </div>
                    )}

                    <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                      Step {i + 1}
                    </div>
                    <h3
                      className={cn(
                        "mt-3 font-headline text-2xl font-bold lg:text-3xl",
                        isDark ? "text-white" : "text-ink"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-4 text-base leading-relaxed lg:text-lg",
                        isDark ? "text-white/70" : "text-muted"
                      )}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
