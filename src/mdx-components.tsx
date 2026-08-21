import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

import { Mermaid } from "@/components/mdx/mermaid";
import { Callout } from "@/components/mdx/callout";
import { InterviewQuestion, ManagerQuestion } from "@/components/mdx/question-card";
import { Pre } from "@/components/mdx/code-block";

/**
 * Global MDX component map. Every chapter in src/content/chapters/*.mdx
 * gets these automatically — no per-file imports required. See
 * CONTENT_GUIDE.md for the full authoring contract these components form.
 */
const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 {...props} className="scroll-mt-28 text-4xl font-bold tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="scroll-mt-28 mt-14 mb-4 border-t border-black/10 pt-10 text-2xl font-bold tracking-tight first:mt-0 first:border-0 first:pt-0 dark:border-white/10"
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props} className="scroll-mt-28 mt-10 mb-3 text-xl font-semibold tracking-tight">
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 {...props} className="scroll-mt-28 mt-8 mb-2 text-base font-semibold tracking-tight">
      {children}
    </h4>
  ),
  a: ({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  table: ({ children, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
      <table {...props} className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props} className="bg-slate-50 dark:bg-white/[0.04]">
      {children}
    </thead>
  ),
  th: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th {...props} className="border-b border-black/10 px-4 py-2.5 text-left font-semibold dark:border-white/10">
      {children}
    </th>
  ),
  td: ({ children, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} className="border-b border-black/5 px-4 py-2.5 align-top dark:border-white/5">
      {children}
    </td>
  ),
  pre: Pre,
  blockquote: ({ children, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="not-prose my-6 border-l-4 border-violet-500/50 pl-4 italic text-slate-600 dark:text-slate-400"
    >
      {children}
    </blockquote>
  ),
  Mermaid,
  Callout,
  InterviewQuestion,
  ManagerQuestion,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return { ...inherited, ...components };
}
