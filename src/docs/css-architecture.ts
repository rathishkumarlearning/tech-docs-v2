import { Doc } from './index'

export const cssArchitecture: Doc = {
  slug: 'css-architecture',
  title: 'CSS Architecture — Scalable Styling for Real Projects',
  description: 'From utility-first to CSS-in-JS to vanilla CSS with custom properties — understand the trade-offs and pick the right approach.',
  author: 'Rathish Kumar',
  date: '2026-02-25',
  readTime: '10 min read',
  source: 'Internal',
  category: 'Engineering',
  tags: ['css', 'tailwind', 'architecture', 'design-systems'],
  accent: '#8b5cf6',
  sections: [
    {
      id: 1,
      title: 'The CSS Landscape in 2026',
      duration: '2 min',
      content: `
        <p>CSS has evolved dramatically. Native nesting, container queries, <code>:has()</code>, and <code>@layer</code> have eliminated many reasons we reached for preprocessors and frameworks.</p>
        <p>Today's options:</p>
        <ul>
          <li><strong>Vanilla CSS</strong> — with custom properties, nesting, layers. Surprisingly powerful.</li>
          <li><strong>Tailwind CSS</strong> — utility-first, co-located styles, great DX. Dominates React.</li>
          <li><strong>CSS Modules</strong> — scoped class names, zero runtime. Good for component libraries.</li>
          <li><strong>CSS-in-JS</strong> — styled-components, Emotion. Declining due to runtime overhead.</li>
        </ul>
        <h4>The Decision Matrix</h4>
        <table>
          <thead>
            <tr><th>Approach</th><th>DX</th><th>Performance</th><th>Scalability</th><th>Best For</th></tr>
          </thead>
          <tbody>
            <tr><td>Vanilla CSS</td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐</td><td>Small-medium projects</td></tr>
            <tr><td>Tailwind</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>Most React apps</td></tr>
            <tr><td>CSS Modules</td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>⭐⭐⭐⭐⭐</td><td>Component libraries</td></tr>
            <tr><td>CSS-in-JS</td><td>⭐⭐⭐⭐</td><td>⭐⭐⭐</td><td>⭐⭐⭐⭐</td><td>Dynamic theming</td></tr>
          </tbody>
        </table>
      `
    },
    {
      id: 2,
      title: 'Custom Properties (CSS Variables)',
      duration: '2 min',
      content: `
        <p>CSS custom properties are the foundation of any modern CSS architecture. They enable theming, consistency, and runtime flexibility that preprocessor variables can't match.</p>
        <pre><code>:root {
  /* Colors */
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-meta: #697485;
  --color-accent: #4d49fc;
  --color-border: #e8e8e8;
  --color-surface: #f5f5f0;

  /* Typography */
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 48px;
  --space-2xl: 80px;

  /* Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 50px;
}</code></pre>
        <h4>Dark Mode with Custom Properties</h4>
        <pre><code>/* Just swap the values */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0a0a0f;
    --color-text: #e2e8f0;
    --color-meta: #94a3b8;
    --color-border: rgba(255,255,255,0.08);
    --color-surface: rgba(255,255,255,0.04);
  }
}

/* Or use a class toggle for manual control */
[data-theme="dark"] {
  --color-bg: #0a0a0f;
  /* ... */
}</code></pre>
        <p>Custom properties cascade and inherit — meaning a component can override variables for its subtree without affecting siblings.</p>
      `
    },
    {
      id: 3,
      title: 'CSS Layers & Specificity',
      duration: '2 min',
      content: `
        <p><code>@layer</code> is the CSS specificity reset button. It lets you define explicit priority order for your styles:</p>
        <pre><code>/* Define layer order (low → high priority) */
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}

@layer base {
  body {
    font-family: var(--font-sans);
    color: var(--color-text);
  }
  
  a { text-decoration: none; }
}

@layer components {
  .card {
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }
}

@layer utilities {
  .sr-only {
    position: absolute;
    clip: rect(0,0,0,0);
  }
}</code></pre>
        <p>With layers, a utility in the <code>utilities</code> layer always beats a component in <code>components</code>, regardless of selector specificity. No more <code>!important</code> battles.</p>
        <h4>Benefits</h4>
        <ul>
          <li>Predictable cascade — you control the order</li>
          <li>Third-party CSS can be contained in its own layer</li>
          <li>No specificity wars between your styles and framework styles</li>
        </ul>
      `
    },
    {
      id: 4,
      title: 'Responsive Design Patterns',
      duration: '2 min',
      content: `
        <p>Modern responsive design goes beyond media queries. Container queries let components respond to their own size, not the viewport.</p>
        <h4>Container Queries</h4>
        <pre><code>/* Define a containment context */
.card-grid {
  container-type: inline-size;
  container-name: grid;
}

/* Style based on container width, not viewport */
@container grid (min-width: 600px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}

@container grid (max-width: 599px) {
  .card {
    display: block;
  }
}</code></pre>
        <h4>Fluid Typography</h4>
        <pre><code>/* Scales smoothly between breakpoints */
h1 {
  font-size: clamp(32px, 5vw, 56px);
  letter-spacing: clamp(-0.5px, -0.015em, -0.84px);
  line-height: 1.1;
}

p {
  font-size: clamp(16px, 1.2vw, 18px);
  line-height: 1.8;
}</code></pre>
        <h4>The Mobile-First Checklist</h4>
        <ul>
          <li>✅ Touch targets: 44px minimum height/width</li>
          <li>✅ Readable without zoom: 16px+ base font</li>
          <li>✅ No horizontal scroll: max-width constraints</li>
          <li>✅ Thumb-friendly: important actions at bottom of screen</li>
          <li>✅ Fast: mobile networks are slow, optimize for them first</li>
        </ul>
      `
    },
    {
      id: 5,
      title: 'The Architecture Checklist',
      duration: '1 min',
      content: `
        <p>Before writing CSS for your next project, decide on your architecture:</p>
        <ul>
          <li>✅ <strong>Design tokens first</strong> — define colors, spacing, typography as CSS variables</li>
          <li>✅ <strong>Layer your styles</strong> — reset → base → components → utilities</li>
          <li>✅ <strong>Scope components</strong> — CSS Modules or BEM naming to avoid collisions</li>
          <li>✅ <strong>Responsive defaults</strong> — mobile-first, fluid typography</li>
          <li>✅ <strong>Dark mode ready</strong> — custom properties make it trivial</li>
          <li>✅ <strong>Performance audit</strong> — check unused CSS, critical CSS path</li>
          <li>✅ <strong>Document decisions</strong> — write down WHY you chose this approach</li>
        </ul>
        <blockquote><p>The best CSS architecture is the one your whole team understands and follows consistently. Simplicity beats cleverness every time.</p></blockquote>
        <p>CSS in 2026 is genuinely powerful. Custom properties, layers, container queries, and nesting mean you can build sophisticated, maintainable styles without any tooling at all. Choose your abstractions carefully — you might need fewer than you think.</p>
      `
    },
  ],
}
