import fs from "node:fs";
import path from "node:path";
import readingTime from "reading-time";
import { CHAPTERS } from "@/lib/chapters";

// Server-only (uses node:fs). Kept out of src/lib/chapters.ts so that
// client components can import the chapter manifest without pulling
// Node builtins into the browser bundle.

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "chapters");

/**
 * Reads the raw MDX source off disk to compute an estimated reading time.
 * Falls back gracefully if the chapter file doesn't exist yet (e.g.
 * mid-generation) so the site never fails to build.
 */
export function getChapterStats(slug: string): { minutes: number; words: number } {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(filePath, "utf8");
    const stats = readingTime(raw);
    return { minutes: Math.max(1, Math.round(stats.minutes)), words: stats.words };
  } catch {
    return { minutes: 0, words: 0 };
  }
}

export function getAllChapterStats(): Record<string, { minutes: number; words: number }> {
  const out: Record<string, { minutes: number; words: number }> = {};
  for (const chapter of CHAPTERS) {
    out[chapter.slug] = getChapterStats(chapter.slug);
  }
  return out;
}
