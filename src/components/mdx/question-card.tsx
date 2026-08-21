import type { ReactNode } from "react";

/**
 * Structured Q&A card used for both "Interview Questions" and
 * "Manager-Level Questions" sections in every chapter.
 *
 * Usage in MDX:
 *
 * <InterviewQuestion q="Why would you choose a headless component over a styled one?">
 *   **What the interviewer is testing:** ...
 *
 *   **Poor answer:** ...
 *
 *   **Good answer:** ...
 *
 *   **Excellent senior answer:** ...
 *
 *   **Common mistakes:** ...
 * </InterviewQuestion>
 */
function QuestionCard({
  q,
  kind,
  children,
}: {
  q: string;
  kind: "interview" | "manager";
  children: ReactNode;
}) {
  const badge =
    kind === "interview"
      ? { label: "Interview question", className: "bg-violet-500/15 text-violet-700 dark:text-violet-300" }
      : { label: "Manager-level question", className: "bg-orange-500/15 text-orange-700 dark:text-orange-300" };

  return (
    <div className="not-prose my-7 overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/50">
      <div className="flex items-start gap-3 border-b border-black/10 bg-slate-50 px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
        <span className={`mt-0.5 shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}>
          {badge.label}
        </span>
        <p className="m-0 font-semibold text-slate-900 dark:text-slate-100">{q}</p>
      </div>
      <div className="prose prose-slate dark:prose-invert max-w-none px-5 py-4 text-sm [&>p]:my-2.5 [&_strong]:text-slate-900 dark:[&_strong]:text-slate-100">
        {children}
      </div>
    </div>
  );
}

export function InterviewQuestion(props: { q: string; children: ReactNode }) {
  return <QuestionCard kind="interview" {...props} />;
}

export function ManagerQuestion(props: { q: string; children: ReactNode }) {
  return <QuestionCard kind="manager" {...props} />;
}
