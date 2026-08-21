import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";

/**
 * Remark plugin: rewrite ```mermaid fenced code blocks into a
 * <Mermaid chart="..." /> JSX element *before* syntax highlighting runs.
 * This lets architecture diagrams render as actual Mermaid SVGs (via the
 * client component in src/components/mdx/mermaid.tsx) instead of being
 * tokenized as source code by rehype-pretty-code.
 */
function remarkMermaid() {
  return (tree: any) => {
    visit(tree, "code", (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined || node.lang !== "mermaid") return;
      parent.children[index] = {
        type: "mdxJsxFlowElement",
        name: "Mermaid",
        attributes: [
          { type: "mdxJsxAttribute", name: "chart", value: node.value },
        ],
        children: [],
      };
    });
  };
}

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMermaid],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: { className: ["anchor"], ariaLabel: "Link to section" },
          content: { type: "text", value: "#" },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: { dark: "github-dark-dimmed", light: "github-light" },
          keepBackground: false,
          defaultLang: "tsx",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
