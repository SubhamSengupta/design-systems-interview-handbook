"use client";

import { useReadProgress } from "@/lib/use-read-progress";

export function MarkAsRead({ slug }: { slug: string }) {
  const { isRead, toggleRead, hydrated } = useReadProgress();
  const done = hydrated && isRead(slug);

  return (
    <button
      type="button"
      onClick={() => toggleRead(slug)}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
        done
          ? "border-violet-500 bg-violet-500 text-white hover:bg-violet-600"
          : "border-black/15 text-slate-700 hover:border-violet-400 hover:text-violet-700 dark:border-white/15 dark:text-slate-300 dark:hover:text-violet-300"
      }`}
    >
      <span aria-hidden>{done ? "✓" : "○"}</span>
      {done ? "Marked as read" : "Mark chapter as read"}
    </button>
  );
}
