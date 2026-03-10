"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { AppMode } from "@/types";

interface ModeContextValue {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode>("explore");

  useEffect(() => {
    const stored = document.cookie
      .split("; ")
      .find((row) => row.startsWith("ledger-mode="))
      ?.split("=")[1];
    if (stored === "explore" || stored === "research") {
      setModeState(stored);
    }
  }, []);

  const setMode = useCallback((newMode: AppMode) => {
    setModeState(newMode);
    document.cookie = `ledger-mode=${newMode};path=/;max-age=${60 * 60 * 24 * 365}`;
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "explore" ? "research" : "explore");
  }, [mode, setMode]);

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
