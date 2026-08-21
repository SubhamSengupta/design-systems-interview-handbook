export type ChapterMeta = {
  slug: string;
  order: number;
  part: string;
  title: string;
  shortTitle: string;
  description: string;
  topics: string[];
};

/**
 * Static manifest of every chapter in the handbook.
 *
 * We keep this as a hand-authored list (rather than parsing MDX
 * frontmatter at build time) because the chapter set is fixed and this
 * gives us a single, reliable source for ordering, the sidebar, the
 * homepage grid, and search — independent of how any individual MDX file
 * is authored or generated.
 */
export const CHAPTERS: ChapterMeta[] = [
  {
    slug: "what-is-a-design-system",
    order: 1,
    part: "I. Foundations",
    title: "1. What is a Design System?",
    shortTitle: "What is a Design System?",
    description:
      "First-principles definition, the difference between a component library, pattern library, UI kit and design language, and why large companies invest millions into design systems.",
    topics: [
      "Design System definition",
      "Component Library vs Pattern Library vs UI Kit",
      "Design Language & Brand Identity",
      "Governance & Documentation",
      "Design Principles",
      "Evolution of Design Systems",
      "Case studies: Material, Polaris, Atlassian, Carbon, Spectrum",
    ],
  },
  {
    slug: "design-tokens",
    order: 2,
    part: "I. Foundations",
    title: "2. Design Tokens",
    shortTitle: "Design Tokens",
    description:
      "Primitive, semantic, component and alias tokens; token hierarchy; Style Dictionary; cross-platform generation for web, iOS and Android; dark mode and multi-brand theming.",
    topics: [
      "Primitive / Semantic / Component / Alias tokens",
      "Token hierarchy & naming conventions",
      "CSS Variables",
      "Dark mode & multi-brand support",
      "Figma Variables",
      "Style Dictionary & transforms",
      "Cross-platform generation (Android XML, iOS, Web)",
      "Versioning tokens",
    ],
  },
  {
    slug: "component-architecture",
    order: 3,
    part: "II. Engineering",
    title: "3. Component Architecture",
    shortTitle: "Component Architecture",
    description:
      "Controlled vs uncontrolled, compound components, headless components, slots, render props, polymorphic components, forwardRef, composition vs inheritance, and accessibility-first API design.",
    topics: [
      "Presentational vs Container",
      "Controlled vs Uncontrolled",
      "Compound Components",
      "Headless Components",
      "Slot Pattern & Render Props",
      "Polymorphic Components (asChild)",
      "forwardRef & useImperativeHandle",
      "Composition vs Inheritance",
      "State ownership & Context performance",
    ],
  },
  {
    slug: "react-architecture",
    order: 4,
    part: "II. Engineering",
    title: "4. React Architecture for Design Systems",
    shortTitle: "React Architecture",
    description:
      "Context and memoization strategy, context splitting, Server Components, concurrent rendering, Suspense, transitions, hydration and streaming SSR for component libraries.",
    topics: [
      "Context & Context splitting",
      "React.memo, useMemo, useCallback",
      "Server Components boundaries",
      "Concurrent Rendering & Transitions",
      "Suspense",
      "Hydration & SSR",
      "Streaming",
    ],
  },
  {
    slug: "accessibility",
    order: 5,
    part: "II. Engineering",
    title: "5. Accessibility",
    shortTitle: "Accessibility",
    description:
      "WCAG and ARIA from first principles, keyboard navigation, focus management and focus traps, color contrast, reduced motion, and building accessible dialogs, menus, tabs and tree views.",
    topics: [
      "WCAG & ARIA",
      "Keyboard Navigation",
      "Focus Management & Focus Trap",
      "Color Contrast",
      "prefers-reduced-motion",
      "Dialogs, Menus, Dropdowns, Tabs, Tree Views",
      "Screen readers & testing accessibility",
    ],
  },
  {
    slug: "styling-architecture",
    order: 6,
    part: "II. Engineering",
    title: "6. Styling Architecture",
    shortTitle: "Styling Architecture",
    description:
      "CSS Modules, Sass/Less, CSS-in-JS (Styled Components, Emotion, Linaria), zero-runtime CSS (Vanilla Extract, Panda CSS), Tailwind, cascade layers, Shadow DOM, and token integration.",
    topics: [
      "CSS Modules, Sass, Less",
      "Styled Components & Emotion",
      "Vanilla Extract & Panda CSS (zero-runtime)",
      "Tailwind CSS",
      "CSS Variables & Cascade Layers",
      "Shadow DOM",
      "Design Token integration",
    ],
  },
  {
    slug: "storybook",
    order: 7,
    part: "III. Tooling",
    title: "7. Storybook",
    shortTitle: "Storybook",
    description:
      "Component Driven Development, CSF, args and controls, autodocs, play functions and interaction tests, Chromatic visual regression, and the accessibility addon.",
    topics: [
      "Component Driven Development",
      "CSF3 & Stories",
      "Args & Controls",
      "Autodocs",
      "Play functions & interaction tests",
      "Chromatic & visual regression",
      "Accessibility addon",
    ],
  },
  {
    slug: "testing-strategy",
    order: 8,
    part: "III. Tooling",
    title: "8. Testing Strategy",
    shortTitle: "Testing Strategy",
    description:
      "The design system testing pyramid: unit, integration, interaction, accessibility, visual regression and snapshot testing with Vitest, Testing Library and Playwright.",
    topics: [
      "Unit vs Integration vs Interaction testing",
      "Accessibility testing",
      "Visual regression testing",
      "Snapshot testing (and its pitfalls)",
      "Playwright, Vitest, Jest, Testing Library",
    ],
  },
  {
    slug: "monorepo-architecture",
    order: 9,
    part: "III. Tooling",
    title: "9. Monorepo Architecture",
    shortTitle: "Monorepo Architecture",
    description:
      "Monorepo vs polyrepo, Turborepo vs Nx vs Lerna vs Rush, pnpm workspaces, task graphs, remote caching, incremental builds, changesets and CI/CD for a component library.",
    topics: [
      "Monorepo vs Polyrepo",
      "Turborepo vs Nx vs Lerna vs Rush",
      "pnpm Workspaces & the dependency graph",
      "Task graph, remote cache, incremental builds",
      "Changesets & package publishing",
      "CI/CD for a design system",
    ],
  },
  {
    slug: "packaging",
    order: 10,
    part: "III. Tooling",
    title: "10. Packaging",
    shortTitle: "Packaging",
    description:
      "Rollup vs tsup vs Vite library mode vs Webpack, tree shaking and sideEffects, dual ESM/CJS packages, peer dependencies, package.json exports, and source maps.",
    topics: [
      "Rollup vs tsup vs Vite library mode",
      "Tree shaking & sideEffects",
      "ESM vs CJS & dual packages",
      "Peer dependencies",
      "package.json exports map",
      "Source maps",
    ],
  },
  {
    slug: "governance",
    order: 11,
    part: "IV. Process",
    title: "11. Governance",
    shortTitle: "Governance",
    description:
      "Contribution models, the RFC process, semantic versioning, deprecation and migration strategy, breaking changes, ownership models and the release process.",
    topics: [
      "Contribution model (centralized vs federated)",
      "RFC process",
      "Semantic Versioning & deprecation",
      "Migration guides & codemods",
      "Adoption strategy & breaking changes",
      "Ownership & release process",
    ],
  },
  {
    slug: "collaboration-with-designers",
    order: 12,
    part: "IV. Process",
    title: "12. Collaboration with Designers",
    shortTitle: "Collaboration with Designers",
    description:
      "Working with Figma, design handoff, design QA, Figma Variables and token synchronization, and how to resolve disagreements between design and engineering.",
    topics: [
      "Figma workflow & design handoff",
      "Design reviews & Design QA",
      "Figma Variables & token sync",
      "Communication models",
      "Resolving design/engineering disagreements",
    ],
  },
  {
    slug: "performance",
    order: 13,
    part: "V. Scale",
    title: "13. Performance",
    shortTitle: "Performance",
    description:
      "Bundle size budgets, tree shaking, lazy loading and code splitting, CSS performance, rendering performance, context optimization, virtualization and memory usage.",
    topics: [
      "Bundle size budgets & tree shaking",
      "Lazy loading & code splitting",
      "CSS performance",
      "Rendering performance & context optimization",
      "Virtualization",
      "Memory usage",
    ],
  },
  {
    slug: "case-studies",
    order: 14,
    part: "V. Scale",
    title: "14. Real Design System Case Studies",
    shortTitle: "Case Studies",
    description:
      "A comparative tour of Material Design, Atlassian Design System, Shopify Polaris, Adobe Spectrum, IBM Carbon, Ant Design, Chakra UI and Radix UI — what each optimizes for and why.",
    topics: [
      "Material Design",
      "Atlassian Design System",
      "Shopify Polaris",
      "Adobe Spectrum",
      "IBM Carbon",
      "Ant Design",
      "Chakra UI",
      "Radix UI",
    ],
  },
  {
    slug: "manager-interview-preparation",
    order: 15,
    part: "VI. Interview Prep",
    title: "15. Manager Interview Preparation",
    shortTitle: "Manager Interview Prep",
    description:
      "Behavioral questions, architecture whiteboard sessions, API design exercises, ownership and leadership questions, mentoring, and cross-functional collaboration scenarios.",
    topics: [
      "Behavioral questions",
      "Architecture & tradeoff whiteboard sessions",
      "API design exercises",
      "Ownership & leadership questions",
      "Mentoring",
      "Cross-functional collaboration scenarios",
    ],
  },
];

export function getChapter(slug: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

export function getAdjacentChapters(slug: string) {
  const index = CHAPTERS.findIndex((c) => c.slug === slug);
  return {
    prev: index > 0 ? CHAPTERS[index - 1] : undefined,
    next: index >= 0 && index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : undefined,
  };
}
