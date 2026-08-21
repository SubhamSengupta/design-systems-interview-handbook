import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CHAPTERS, getAdjacentChapters, getChapter } from "@/lib/chapters";
import { getChapterStats } from "@/lib/chapter-stats.server";
import { TableOfContents } from "@/components/site/table-of-contents";
import { MarkAsRead } from "@/components/site/mark-as-read";

type ChapterModule = { default: React.ComponentType; metadata?: { description?: string } };

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  return {
    title: chapter.title,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  let ChapterContent: React.ComponentType;
  try {
    const mod = (await import(`@/content/chapters/${slug}.mdx`)) as ChapterModule;
    ChapterContent = mod.default;
  } catch {
    notFound();
  }

  const { prev, next } = getAdjacentChapters(slug);
  const stats = getChapterStats(slug);

  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {chapter.part}
          {stats.minutes > 0 ? ` · ${stats.minutes} min read` : ""}
        </p>

        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-strong:text-slate-900 dark:prose-strong:text-slate-100">
          <ChapterContent />
        </article>

        <div className="mt-10">
          <MarkAsRead slug={slug} />
        </div>

        <nav className="mt-12 grid gap-3 border-t border-black/10 pt-8 dark:border-white/10 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/chapters/${prev.slug}`}
              className="group rounded-xl border border-black/10 p-4 transition hover:border-violet-400/60 dark:border-white/10"
            >
              <p className="text-xs text-slate-400">← Previous</p>
              <p className="mt-1 font-medium text-slate-800 group-hover:text-violet-700 dark:text-slate-200 dark:group-hover:text-violet-300">
                {prev.shortTitle}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/chapters/${next.slug}`}
              className="group rounded-xl border border-black/10 p-4 text-right transition hover:border-violet-400/60 dark:border-white/10"
            >
              <p className="text-xs text-slate-400">Next →</p>
              <p className="mt-1 font-medium text-slate-800 group-hover:text-violet-700 dark:text-slate-200 dark:group-hover:text-violet-300">
                {next.shortTitle}
              </p>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>

      <aside className="hidden w-56 shrink-0 xl:block">
        <TableOfContents />
      </aside>
    </div>
  );
}
