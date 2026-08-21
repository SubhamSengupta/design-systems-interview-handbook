"use client";

import { useCallback, useEffect, useState } from "react";
import { CHAPTERS } from "@/lib/chapters";

const STORAGE_KEY = "handbook:read-chapters:v1";

function readStorage(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

/**
 * Tracks which chapters the reader has marked "done" so the handbook can
 * be used as a study checklist across multiple sessions. Pure client-side
 * (localStorage) — there's no account system, this is a personal study aid.
 */
export function useReadProgress() {
  const [readSlugs, setReadSlugs] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setReadSlugs(readStorage());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    setReadSlugs(new Set(next));
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
    } catch {
      // Storage unavailable (private mode, quota) — progress just won't persist.
    }
  }, []);

  const toggleRead = useCallback(
    (slug: string) => {
      const next = new Set(readSlugs);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      persist(next);
    },
    [readSlugs, persist],
  );

  const isRead = useCallback((slug: string) => readSlugs.has(slug), [readSlugs]);

  const percent = hydrated ? Math.round((readSlugs.size / CHAPTERS.length) * 100) : 0;

  return { readSlugs, isRead, toggleRead, percent, hydrated };
}
