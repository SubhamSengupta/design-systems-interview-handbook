"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Renders a Mermaid diagram from raw chart source.
 *
 * Mermaid is a browser-oriented library (it manipulates the DOM directly
 * and has no meaningful SSR story), so this is a client component that
 * lazy-loads `mermaid` on mount. The MDX pipeline rewrites ```mermaid code
 * fences into <Mermaid chart="..." /> at build time (see
 * remarkMermaid in next.config.ts), so authors just write a normal fenced
 * code block in their chapter and get an interactive diagram for free.
 */
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "-");
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "strict",
          fontFamily: "var(--font-sans)",
          themeVariables: isDark
            ? { darkMode: true, background: "#0b0f1a" }
            : {},
        });
        const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim());
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, isDark]);

  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-slate-900/60">
      {error ? (
        <pre className="whitespace-pre-wrap text-sm text-red-500">
          Mermaid render error: {error}
        </pre>
      ) : (
        <div ref={containerRef} className="flex min-h-[80px] items-center justify-center [&_svg]:mx-auto" />
      )}
    </div>
  );
}
