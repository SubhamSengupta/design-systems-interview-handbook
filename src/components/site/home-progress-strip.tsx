"use client";

import { useReadProgress } from "@/lib/use-read-progress";
import { CHAPTERS } from "@/lib/chapters";

export function HomeProgressStrip() {
  const { percent, readSlugs, hydrated } = useReadProgress();
  if (!hydrated || readSlugs.size === 0) return null;

  return (
    <div className="mt-8 max-w-md rounded-xl border border-black/10 bg-surface p-4 dark:border-white/10">
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">Your progress</span>
        <span className="text-slate-500 dark:text-slate-400">
          {readSlugs.size} / {CHAPTERS.length} chapters
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
        <div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
