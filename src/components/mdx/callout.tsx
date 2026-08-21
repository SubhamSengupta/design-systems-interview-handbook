import type { ReactNode } from "react";

const STYLES = {
  info: {
    label: "Note",
    className:
      "border-sky-500/30 bg-sky-50 text-sky-950 dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-100",
    icon: "ℹ",
  },
  tip: {
    label: "Tip",
    className:
      "border-emerald-500/30 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-100",
    icon: "✓",
  },
  warning: {
    label: "Watch out",
    className:
      "border-amber-500/30 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-100",
    icon: "!",
  },
  danger: {
    label: "Common mistake",
    className:
      "border-red-500/30 bg-red-50 text-red-950 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-100",
    icon: "✕",
  },
} as const;

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof STYLES;
  title?: string;
  children: ReactNode;
}) {
  const style = STYLES[type];
  return (
    <div className={`not-prose my-6 rounded-xl border px-5 py-4 text-sm leading-relaxed ${style.className}`}>
      <div className="mb-1.5 flex items-center gap-2 font-semibold">
        <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-current/15 text-xs">
          {style.icon}
        </span>
        {title ?? style.label}
      </div>
      <div className="prose-callout [&>p]:my-1.5 [&_a]:underline">{children}</div>
    </div>
  );
}
