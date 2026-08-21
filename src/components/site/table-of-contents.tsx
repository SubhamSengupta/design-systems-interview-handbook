"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: 2 | 3 };

/**
 * Builds an in-page table of contents by scanning the rendered article's
 * h2/h3 elements (which have ids from rehype-slug) after mount, then uses
 * an IntersectionObserver to highlight whichever section is in view.
 *
 * DOM-scanning rather than parsing the MDX AST keeps this decoupled from
 * how chapters are authored/generated — it works for any heading structure.
 */
export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;
    const nodes = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2, h3"));
    setHeadings(
      nodes.map((node) => ({
        id: node.id,
        text: node.textContent?.replace(/#$/, "").trim() ?? "",
        level: node.tagName === "H2" ? 2 : 3,
      })),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="thin-scrollbar sticky top-[72px] max-h-[calc(100vh-96px)] overflow-y-auto py-2 text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? "0.75rem" : 0 }}>
            <a
              href={`#${h.id}`}
              data-active={activeId === h.id}
              className="toc-link block border-l-2 border-transparent py-0.5 pl-3 text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
