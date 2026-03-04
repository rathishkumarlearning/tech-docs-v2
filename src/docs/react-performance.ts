import { Doc } from './index'

export const reactPerformance: Doc = {
  slug: 'react-performance',
  title: 'React Performance — Patterns That Actually Matter',
  description: 'Stop guessing. Learn the React performance patterns that make a real difference — from rendering to memoization to bundle optimization.',
  author: 'Rathish Kumar',
  date: '2026-03-02',
  readTime: '15 min read',
  source: 'react.dev',
  category: 'Engineering',
  tags: ['react', 'performance', 'javascript', 'optimization'],
  accent: '#0ea5e9',
  sections: [
    {
      id: 1,
      title: 'The Rendering Mental Model',
      duration: '3 min',
      content: `
        <p>React's rendering model is both its greatest strength and the source of most performance issues. Understanding <strong>when and why React re-renders</strong> is the foundation of all optimization.</p>
        <p>A component re-renders when:</p>
        <ul>
          <li>Its state changes (via <code>useState</code>, <code>useReducer</code>)</li>
          <li>Its parent re-renders (props may or may not have changed)</li>
          <li>A context it consumes changes</li>
        </ul>
        <blockquote><p>The #1 mistake: assuming React only re-renders when props change. It doesn't. It re-renders when the parent re-renders, regardless of props.</p></blockquote>
        <h4>The Render Cascade</h4>
        <p>When a component re-renders, <strong>all of its children re-render too</strong>. This cascade is intentional — React assumes rendering is cheap and correctness matters more than skipping renders.</p>
        <pre><code>function Parent() {
  const [count, setCount] = useState(0)
  
  return (
    &lt;div&gt;
      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;
        Count: {count}
      &lt;/button&gt;
      {/* Child re-renders even though it has no props! */}
      &lt;ExpensiveChild /&gt;
    &lt;/div&gt;
  )
}</code></pre>
        <p>This is where optimization begins — but only when you've measured and confirmed a real problem.</p>
      `
    },
    {
      id: 2,
      title: 'Measuring Before Optimizing',
      duration: '2 min',
      content: `
        <p>Premature optimization is the root of all evil. Before applying any performance pattern, <strong>measure first</strong>.</p>
        <h4>React DevTools Profiler</h4>
        <p>The Profiler is your best friend. It shows:</p>
        <ul>
          <li>Which components rendered and why</li>
          <li>How long each render took</li>
          <li>Which renders were unnecessary</li>
        </ul>
        <pre><code>// Enable "Highlight updates when components render"
// in React DevTools settings for a visual indicator

// Or use the Profiler API programmatically:
import { Profiler } from 'react'

function onRender(id, phase, actualDuration) {
  console.log(\`\${id} rendered in \${actualDuration}ms (\${phase})\`)
}

&lt;Profiler id="MyComponent" onRender={onRender}&gt;
  &lt;MyComponent /&gt;
&lt;/Profiler&gt;</code></pre>
        <h4>The Performance Budget</h4>
        <table>
          <thead>
            <tr><th>Metric</th><th>Target</th><th>Concern</th></tr>
          </thead>
          <tbody>
            <tr><td>Component render</td><td>&lt; 5ms</td><td>&gt; 16ms</td></tr>
            <tr><td>List item render</td><td>&lt; 1ms</td><td>&gt; 3ms</td></tr>
            <tr><td>Total frame time</td><td>&lt; 16ms</td><td>&gt; 33ms</td></tr>
            <tr><td>Initial bundle</td><td>&lt; 200KB</td><td>&gt; 500KB</td></tr>
          </tbody>
        </table>
      `
    },
    {
      id: 3,
      title: 'React.memo — The Right Way',
      duration: '2 min',
      content: `
        <p><code>React.memo</code> is the most common optimization tool, and the most misused. It wraps a component to skip re-rendering when props haven't changed.</p>
        <pre><code>// Good: Expensive component that receives stable props
const ExpensiveChart = React.memo(function Chart({ data }) {
  // Complex SVG rendering...
  return &lt;svg&gt;...&lt;/svg&gt;
})

// Bad: Simple component with cheap renders
const Label = React.memo(({ text }) =&gt; &lt;span&gt;{text}&lt;/span&gt;)
// ^ The memo comparison costs more than the render!</code></pre>
        <h4>When to Use memo</h4>
        <ul>
          <li>✅ Component renders frequently with the same props</li>
          <li>✅ Component is expensive to render (complex DOM, calculations)</li>
          <li>✅ Component is in a list with many siblings</li>
          <li>❌ Component is simple (a few DOM elements)</li>
          <li>❌ Props change on every render (new objects/arrays)</li>
        </ul>
        <blockquote><p>memo is a performance hint, not a guarantee. If your props are unstable (new object references each render), memo does nothing — it still re-renders every time.</p></blockquote>
      `
    },
    {
      id: 4,
      title: 'useMemo and useCallback',
      duration: '2 min',
      content: `
        <p>These hooks stabilize values and functions between renders. They're the companions to <code>React.memo</code>.</p>
        <pre><code>function SearchResults({ query, items }) {
  // Memoize expensive computation
  const filtered = useMemo(
    () =&gt; items.filter(item =&gt; 
      item.name.toLowerCase().includes(query.toLowerCase())
    ),
    [query, items]
  )

  // Stabilize callback for child components
  const handleSelect = useCallback(
    (id: string) =&gt; {
      // handle selection
    },
    []  // empty deps = stable forever
  )

  return (
    &lt;List items={filtered} onSelect={handleSelect} /&gt;
  )
}</code></pre>
        <h4>The Decision Framework</h4>
        <table>
          <thead>
            <tr><th>Hook</th><th>Use When</th><th>Skip When</th></tr>
          </thead>
          <tbody>
            <tr><td>useMemo</td><td>Expensive computation, referential equality needed</td><td>Simple values, primitives</td></tr>
            <tr><td>useCallback</td><td>Passing callbacks to memo'd children</td><td>No memo'd children consume it</td></tr>
          </tbody>
        </table>
        <p><strong>Key insight:</strong> <code>useMemo</code> and <code>useCallback</code> only help when combined with <code>React.memo</code> on child components. Without memo, stabilizing references is pointless — the child re-renders anyway.</p>
      `
    },
    {
      id: 5,
      title: 'State Management Patterns',
      duration: '2 min',
      content: `
        <p>Where you put state determines how many components re-render when it changes. State placement is the highest-impact optimization.</p>
        <h4>Push State Down</h4>
        <pre><code>// BAD: State lives too high
function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    &lt;div&gt;
      &lt;Header /&gt;          {/* re-renders on every toggle! */}
      &lt;Sidebar /&gt;         {/* re-renders on every toggle! */}
      &lt;Modal isOpen={isOpen} onClose={() =&gt; setIsOpen(false)} /&gt;
    &lt;/div&gt;
  )
}

// GOOD: State lives where it's used
function ModalContainer() {
  const [isOpen, setIsOpen] = useState(false)
  return &lt;Modal isOpen={isOpen} onClose={() =&gt; setIsOpen(false)} /&gt;
}</code></pre>
        <h4>Composition Over Centralization</h4>
        <p>Instead of one big state store, use component-local state for UI concerns:</p>
        <ul>
          <li><strong>Local state</strong> for UI toggle, form inputs, hover states</li>
          <li><strong>Lifted state</strong> for shared parent-child data</li>
          <li><strong>Context</strong> for truly global data (theme, auth, locale)</li>
          <li><strong>External stores</strong> for complex server state (React Query, SWR)</li>
        </ul>
      `
    },
    {
      id: 6,
      title: 'Virtualization for Long Lists',
      duration: '2 min',
      content: `
        <p>Rendering 10,000 DOM nodes is slow no matter how fast your components are. <strong>Virtualization</strong> renders only what's visible in the viewport.</p>
        <pre><code>import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }) {
  const parentRef = useRef(null)
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () =&gt; parentRef.current,
    estimateSize: () =&gt; 60,
  })

  return (
    &lt;div ref={parentRef} style={{ height: 600, overflow: 'auto' }}&gt;
      &lt;div style={{ height: virtualizer.getTotalSize() }}&gt;
        {virtualizer.getVirtualItems().map(virtualRow =&gt; (
          &lt;div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size,
            }}
          &gt;
            {items[virtualRow.index].name}
          &lt;/div&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  )
}</code></pre>
        <h4>When to Virtualize</h4>
        <ul>
          <li>✅ Lists with 100+ items</li>
          <li>✅ Tables with complex row rendering</li>
          <li>✅ Infinite scroll feeds</li>
          <li>❌ Short lists (&lt; 50 items)</li>
          <li>❌ Lists where all items must be in DOM (SEO, Ctrl+F)</li>
        </ul>
      `
    },
    {
      id: 7,
      title: 'Code Splitting & Lazy Loading',
      duration: '2 min',
      content: `
        <p>Ship less JavaScript upfront. <code>React.lazy</code> + <code>Suspense</code> let you split your bundle at the route level.</p>
        <pre><code>import { lazy, Suspense } from 'react'

const Dashboard = lazy(() =&gt; import('./pages/Dashboard'))
const Settings = lazy(() =&gt; import('./pages/Settings'))

function App() {
  return (
    &lt;Suspense fallback={&lt;LoadingSpinner /&gt;}&gt;
      &lt;Routes&gt;
        &lt;Route path="/dashboard" element={&lt;Dashboard /&gt;} /&gt;
        &lt;Route path="/settings" element={&lt;Settings /&gt;} /&gt;
      &lt;/Routes&gt;
    &lt;/Suspense&gt;
  )
}</code></pre>
        <h4>Bundle Analysis</h4>
        <p>Always visualize your bundle before optimizing:</p>
        <pre><code># Install the analyzer
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default {
  plugins: [
    visualizer({ open: true, gzipSize: true })
  ]
}</code></pre>
        <p>Common bundle bloaters:</p>
        <ul>
          <li><strong>moment.js</strong> → use <code>date-fns</code> or <code>dayjs</code></li>
          <li><strong>lodash</strong> → import individual functions</li>
          <li><strong>Full icon libraries</strong> → tree-shake with named imports</li>
        </ul>
      `
    },
    {
      id: 8,
      title: 'The Performance Checklist',
      duration: '1 min',
      content: `
        <p>Here's your go-to checklist for React performance:</p>
        <ul>
          <li>✅ <strong>Measure first</strong> — use React Profiler before optimizing</li>
          <li>✅ <strong>Push state down</strong> — minimize re-render blast radius</li>
          <li>✅ <strong>Memo expensive components</strong> — but only when props are stable</li>
          <li>✅ <strong>Virtualize long lists</strong> — 100+ items should be windowed</li>
          <li>✅ <strong>Lazy load routes</strong> — ship less JS upfront</li>
          <li>✅ <strong>Avoid inline objects/arrays in JSX</strong> — breaks memo equality</li>
          <li>✅ <strong>Use keys properly</strong> — stable, unique keys prevent unnecessary remounts</li>
          <li>✅ <strong>Debounce user input</strong> — search, resize, scroll handlers</li>
        </ul>
        <blockquote><p>Performance optimization is about trade-offs. Every optimization adds complexity. Only optimize what you've measured to be slow, and stop when it's fast enough.</p></blockquote>
        <p>Remember: React is fast by default. Most apps don't need aggressive optimization. Focus on the fundamentals — good state management, reasonable component structure, and proper code splitting — and you'll be fine.</p>
      `
    },
  ],
}
