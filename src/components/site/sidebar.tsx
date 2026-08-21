"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { CHAPTERS } from "@/lib/chapters";
import { useReadProgress } from "@/lib/use-read-progress";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const { isRead, percent, hydrated } = useReadProgress();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CHAPTERS;
    return CHAPTERS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.topics.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const parts = new Map<string, typeof CHAPTERS>();
    for (const chapter of filtered) {
      const arr = parts.get(chapter.part) ?? [];
      arr.push(chapter);
      parts.set(chapter.part, arr);
    }
    return Array.from(parts.entries());
  }, [filtered]);

  return (
    <nav className="flex h-full flex-col gap-4">
      <div className="px-1">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chapters & topics…"
          className="w-full rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm outline-none placeholder:text-slate-400 focus:border-violet-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-100"
        />
      </div>

      {hydrated && (
        <div className="px-1">
          <div className="mb-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Your progress</span>
            <span>{percent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-violet-500 transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}

      <div className="thin-scrollbar flex-1 overflow-y-auto px-1 pb-8">
        {grouped.length === 0 && (
          <p className="px-2 py-4 text-sm text-slate-400">No chapters match &ldquo;{query}&rdquo;.</p>
        )}
        {grouped.map(([part, chapters]) => (
          <div key={part} className="mb-5">
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {part}
            </p>
            <ul className="space-y-0.5">
              {chapters.map((chapter) => {
                const href = `/chapters/${chapter.slug}`;
                const active = pathname === href;
                return (
                  <li key={chapter.slug}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                        active
                          ? "bg-violet-500/10 font-medium text-violet-700 dark:text-violet-300"
                          : "text-slate-600 hover:bg-black/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-100"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                          isRead(chapter.slug)
                            ? "border-violet-500 bg-violet-500 text-white"
                            : "border-black/20 dark:border-white/20"
                        }`}
                      >
                        {isRead(chapter.slug) ? "✓" : ""}
                      </span>
                      <span className="truncate">{chapter.shortTitle}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
