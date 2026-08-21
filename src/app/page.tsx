import Link from "next/link";
import { CHAPTERS } from "@/lib/chapters";
import { getAllChapterStats } from "@/lib/chapter-stats.server";
import { SITE } from "@/lib/site";
import { HomeProgressStrip } from "@/components/site/home-progress-strip";

export default function Home() {
  const stats = getAllChapterStats();
  const totalMinutes = Object.values(stats).reduce((sum, s) => sum + s.minutes, 0);
  const totalWords = Object.values(stats).reduce((sum, s) => sum + s.words, 0);

  const parts = Array.from(new Set(CHAPTERS.map((c) => c.part)));

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="mb-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
          Interview handbook
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {SITE.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {SITE.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
          <span>{CHAPTERS.length} chapters</span>
          <span aria-hidden>·</span>
          <span>{totalWords > 0 ? `${(totalWords / 1000).toFixed(0)}k+ words` : "80k–120k words"}</span>
          <span aria-hidden>·</span>
          <span>{totalMinutes > 0 ? `~${Math.round(totalMinutes / 60)} hr read` : "long-form reference"}</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/chapters/${CHAPTERS[0].slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Start with Chapter 1
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="#chapters"
            className="inline-flex items-center gap-2 rounded-lg border border-black/15 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-400 hover:text-violet-700 dark:border-white/15 dark:text-slate-200 dark:hover:text-violet-300"
          >
            Browse all chapters
          </Link>
        </div>

        <HomeProgressStrip />
      </section>

      <section className="mb-14 grid gap-4 sm:grid-cols-3">
        <InfoCard
          title="Who this is for"
          body="Senior Frontend Engineers (7–10+ years) with strong React, TypeScript and architecture skills, interviewing with an Engineering Manager and a Design Systems team."
        />
        <InfoCard
          title="How to use it"
          body="Read chapters in order the first time — later chapters (governance, case studies, manager prep) assume the vocabulary built in earlier ones. Come back and jump around before an interview."
        />
        <InfoCard
          title="What's inside"
          body="Every chapter follows the same template: first-principles definition, architecture diagrams, production-grade code, tradeoffs, common mistakes, and interview + manager-level Q&A."
        />
      </section>

      <section id="chapters" className="scroll-mt-20">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Chapters</h2>
        <div className="space-y-10">
          {parts.map((part) => (
            <div key={part}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {part}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {CHAPTERS.filter((c) => c.part === part).map((chapter) => {
                  const s = stats[chapter.slug];
                  return (
                    <Link
                      key={chapter.slug}
                      href={`/chapters/${chapter.slug}`}
                      className="group rounded-xl border border-black/10 bg-white p-5 transition hover:border-violet-400/60 hover:shadow-md dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-violet-400/40"
                    >
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 dark:text-slate-100 dark:group-hover:text-violet-300">
                          {chapter.title}
                        </h3>
                        {s.minutes > 0 && (
                          <span className="shrink-0 whitespace-nowrap text-xs text-slate-400">{s.minutes} min</span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {chapter.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-surface p-5 dark:border-white/10">
      <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{body}</p>
    </div>
  );
}
