"use client";

import { useState, type ReactNode, type HTMLAttributes } from "react";

/**
 * Wraps rehype-pretty-code output (`<pre data-language="tsx">...</pre>`)
 * with a small header bar (language label + copy button). rehype-pretty-code
 * already annotates the <pre> with `data-language` and `data-theme` and
 * puts line numbers etc. on `<code>`, so we only need to add chrome around
 * it — the token spans themselves are left untouched.
 */
export function Pre({ children, ...props }: HTMLAttributes<HTMLPreElement> & { children?: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const language = (props as { "data-language"?: string })["data-language"] ?? "text";

  async function handleCopy(event: React.MouseEvent<HTMLButtonElement>) {
    const pre = event.currentTarget.closest("figure")?.querySelector("pre");
    const text = pre?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  }

  return (
    <figure className="not-prose group relative my-6 overflow-hidden rounded-xl border border-black/10 bg-[#f6f8fa] dark:border-white/10 dark:bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-2 dark:border-white/10">
        <span className="font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-black/5 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-100"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre {...props} className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
        {children}
      </pre>
    </figure>
  );
}
