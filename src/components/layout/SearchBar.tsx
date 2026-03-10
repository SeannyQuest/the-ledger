"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ENTITY_LABELS, ENTITY_COLORS } from "@/lib/constants";
import { formatCompactMoney } from "@/lib/utils";
import type { EntityType, SearchResult } from "@/types";

interface SearchBarProps {
  compact?: boolean;
}

export function SearchBar({ compact }: SearchBarProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(true);
    }
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results ?? []);
        }
      } catch {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors hover:border-ink/30",
          compact ? "w-8 h-8 p-0 justify-center" : "w-64"
        )}
      >
        <Search className="h-4 w-4 shrink-0" />
        {!compact && (
          <>
            <span>Search entities...</span>
            <kbd className="ml-auto rounded border border-border-light px-1.5 py-0.5 font-mono text-[10px] text-muted">
              ⌘K
            </kbd>
          </>
        )}
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm" onClick={() => { setOpen(false); setQuery(""); }} />

      {/* Modal */}
      <div className="fixed inset-x-0 top-[15vh] z-50 mx-auto w-full max-w-2xl px-4">
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
          {/* Input */}
          <div className="flex items-center gap-3 border-b border-border-light px-4 py-3">
            <Search className="h-5 w-5 text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search politicians, corporations, PACs, lobbyists..."
              className="flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="rounded border border-border-light px-1.5 py-0.5 font-mono text-[10px] text-muted">
              ESC
            </kbd>
          </div>

          {/* Results */}
          {query.length >= 2 && results.length > 0 && (
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {results.map((result) => (
                <a
                  key={result.entity.id}
                  href={`/entity/${result.entity.type}/${result.entity.id}`}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-paper"
                  onClick={() => { setOpen(false); setQuery(""); }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: ENTITY_COLORS[result.entity.type] }}
                  >
                    {result.entity.type.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-ink">
                      {result.entity.name}
                    </div>
                    <div className="text-xs text-muted">
                      {ENTITY_LABELS[result.entity.type as EntityType]}
                      {result.entity.totalReceived > 0 && (
                        <span className="ml-2">{formatCompactMoney(result.entity.totalReceived)} received</span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Empty state */}
          {query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-sm text-muted">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {/* Hint */}
          {query.length < 2 && (
            <div className="p-6 text-center text-sm text-muted">
              Type at least 2 characters to search politicians, corporations, PACs, and lobbyists.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
