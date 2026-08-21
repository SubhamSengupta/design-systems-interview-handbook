"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/site/sidebar";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { ReadingProgressBar } from "@/components/site/reading-progress-bar";
import { SITE } from "@/lib/site";

export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/10">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open chapter navigation"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/10 lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-violet-500 text-xs font-bold text-white">
              DS
            </span>
            <span className="hidden sm:inline">Design Systems Interview Handbook</span>
            <span className="sm:hidden">DS Handbook</span>
          </Link>

          <div className="ml-auto flex items-center gap-1.5">
            <a
              href={SITE.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm text-slate-500 hover:bg-black/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100 sm:inline-flex"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.27.82-.6 0-.29-.01-1.07-.02-2.1-3.34.75-4.04-1.65-4.04-1.65-.55-1.44-1.34-1.82-1.34-1.82-1.09-.77.08-.76.08-.76 1.2.09 1.84 1.27 1.84 1.27 1.07 1.87 2.81 1.33 3.5 1.02.11-.79.42-1.33.76-1.64-2.67-.31-5.47-1.38-5.47-6.15 0-1.36.47-2.47 1.24-3.34-.12-.31-.54-1.57.12-3.28 0 0 1.01-.33 3.3 1.28a11.2 11.2 0 0 1 6 0c2.29-1.6 3.3-1.28 3.3-1.28.66 1.71.24 2.97.12 3.28.77.87 1.24 1.98 1.24 3.34 0 4.78-2.81 5.83-5.49 6.14.43.38.81 1.13.81 2.28 0 1.64-.02 2.97-.02 3.38 0 .33.22.72.83.6C20.56 22.34 24 17.74 24 12.3 24 5.5 18.63 0 12 0Z" />
              </svg>
              Source
            </a>
            <ThemeToggle />
          </div>
        </div>
        <ReadingProgressBar />
      </header>

      <div className="flex flex-1">
        <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-64 shrink-0 border-r border-black/10 px-3 py-5 dark:border-white/10 lg:block">
          <Sidebar />
        </aside>

        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-hidden border-r border-black/10 bg-background px-3 py-5 shadow-xl dark:border-white/10">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-sm font-semibold">Chapters</span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  ✕
                </button>
              </div>
              <Sidebar onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
