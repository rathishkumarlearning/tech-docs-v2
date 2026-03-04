import { Doc } from './index'

export const figmaDesignSystem: Doc = {
  slug: 'figma-design-system',
  title: 'Figma Design System — The Art of Clean Typography',
  description: 'A deep dive into Figma\'s design philosophy: white space, typography, color, and the principles that make their interfaces so readable.',
  author: 'Rathish Kumar',
  date: '2026-03-04',
  readTime: '12 min read',
  source: 'figma.com',
  category: 'Design',
  tags: ['design-systems', 'typography', 'figma', 'ui-design'],
  accent: '#4d49fc',
  sections: [
    {
      id: 1,
      title: 'Why Figma\'s Design Stands Out',
      duration: '2 min',
      content: `
        <p>In a world of over-designed interfaces, Figma's website is a breath of fresh air. It doesn't scream for attention — it earns it through clarity, restraint, and purposeful design choices.</p>
        <p>What makes Figma's design remarkable isn't what they added — it's what they removed. No gradients on text. No glassmorphism. No noise overlays. Just clean typography on white space, with occasional pops of their signature purple.</p>
        <blockquote><p>Great design is as little design as possible. — Dieter Rams</p></blockquote>
        <p>This philosophy runs through every pixel of Figma's interface. Their website loads fast, reads beautifully on any device, and never makes you squint or scroll unnecessarily.</p>
        <p>The key insight: <strong>readability is the ultimate feature</strong>. When your content is easy to consume, users stay longer, understand more, and come back more often.</p>
        <h4>The Competitive Landscape</h4>
        <p>Compare Figma's approach with competitors:</p>
        <table>
          <thead>
            <tr><th>Tool</th><th>Approach</th><th>Result</th></tr>
          </thead>
          <tbody>
            <tr><td>Figma</td><td>Minimalist, typography-first</td><td>Clean, fast, scannable</td></tr>
            <tr><td>Sketch</td><td>Moderate styling</td><td>Professional but dated</td></tr>
            <tr><td>Adobe XD</td><td>Heavy UI chrome</td><td>Complex, slower to parse</td></tr>
            <tr><td>Framer</td><td>Animation-heavy</td><td>Beautiful but distracting</td></tr>
          </tbody>
        </table>
      `
    },
    {
      id: 2,
      title: 'The Power of White Space',
      duration: '2 min',
      content: `
        <p>White space isn't empty space — it's breathing room. Figma uses generous margins and padding throughout their design, giving every element room to exist without competition.</p>
        <p>Consider their section spacing: hero sections have 120px+ of vertical padding. Cards sit in grids with 24px gaps. Paragraphs breathe with 1.6-1.8 line height. Nothing feels cramped.</p>
        <pre><code>/* Figma's spacing philosophy */
.hero-section {
  padding: 120px 0;        /* Generous vertical space */
}

.card-grid {
  gap: 24px;               /* Comfortable card spacing */
  padding: 80px 0;         /* Section breathing room */
}

.content p {
  line-height: 1.8;        /* Text that breathes */
  margin-bottom: 20px;     /* Paragraph separation */
}</code></pre>
        <p>The rule of thumb: <strong>when in doubt, add more space</strong>. It's far easier to feel crowded than to feel too spacious. White space communicates confidence.</p>
        <h4>Spacing Scale</h4>
        <ul>
          <li>Hero sections: 120px+ vertical padding</li>
          <li>Between major sections: 80px</li>
          <li>Card grid gaps: 24px</li>
          <li>Paragraph spacing: 20px margin-bottom</li>
          <li>Line height: 1.6 for UI, 1.8 for long-form</li>
          <li>Letter spacing: negative on headings (-0.02em to -0.04em)</li>
        </ul>
      `
    },
    {
      id: 3,
      title: 'Typography System',
      duration: '3 min',
      content: `
        <p>Figma's typography is built on a clear hierarchy. They use <strong>Plus Jakarta Sans</strong> for headings and body, with <strong>JetBrains Mono</strong> for code and technical labels.</p>
        <h4>The Type Scale</h4>
        <table>
          <thead>
            <tr><th>Element</th><th>Size</th><th>Weight</th><th>Tracking</th></tr>
          </thead>
          <tbody>
            <tr><td>Hero H1</td><td>72px</td><td>400</td><td>-1.44px</td></tr>
            <tr><td>Page H1</td><td>56px</td><td>600</td><td>-0.84px</td></tr>
            <tr><td>Section H2</td><td>42px</td><td>600</td><td>-0.5px</td></tr>
            <tr><td>Card H3</td><td>24px</td><td>600</td><td>-0.24px</td></tr>
            <tr><td>Body</td><td>18px</td><td>400</td><td>normal</td></tr>
            <tr><td>Mono Label</td><td>12px</td><td>500</td><td>0.6px</td></tr>
          </tbody>
        </table>
        <h4>Key Principles</h4>
        <ul>
          <li><strong>Negative letter-spacing on headings</strong> — tightens large text for a more refined look</li>
          <li><strong>Positive letter-spacing on mono labels</strong> — opens up small uppercase text for readability</li>
          <li><strong>Weight contrast</strong> — 400 for body, 600-700 for headings creates clear hierarchy</li>
          <li><strong>Line height scales inversely</strong> — larger text needs less line height (1.05 for H1, 1.8 for body)</li>
        </ul>
        <pre><code>/* Typography implementation */
h1 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 56px;
  font-weight: 600;
  letter-spacing: -0.84px;
  line-height: 1.05;
}

.mono-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #697485;
}</code></pre>
      `
    },
    {
      id: 4,
      title: 'Color Philosophy',
      duration: '2 min',
      content: `
        <p>Figma's color palette is remarkably restrained. The entire site operates on essentially four colors:</p>
        <table>
          <thead>
            <tr><th>Role</th><th>Color</th><th>Usage</th></tr>
          </thead>
          <tbody>
            <tr><td>Background</td><td>#ffffff</td><td>Page background, cards</td></tr>
            <tr><td>Primary Text</td><td>#000000</td><td>Headings, important text</td></tr>
            <tr><td>Meta Text</td><td>#697485</td><td>Labels, descriptions, timestamps</td></tr>
            <tr><td>Accent</td><td>#4d49fc</td><td>Links, active states, CTAs</td></tr>
          </tbody>
        </table>
        <blockquote><p>Color should inform, not decorate. Every color on Figma's site has a purpose — there are no decorative gradients or background colors without function.</p></blockquote>
        <h4>The 90/10 Rule</h4>
        <p>90% of Figma's interface is black, white, and gray. The remaining 10% is their accent purple, used sparingly for:</p>
        <ul>
          <li>Interactive elements (links, buttons)</li>
          <li>Active/selected states</li>
          <li>Brand moments (logo, CTAs)</li>
          <li>Focus indicators</li>
        </ul>
        <p>This restraint makes every splash of color meaningful. When everything is colorful, nothing stands out. When color is rare, it <strong>commands attention</strong>.</p>
      `
    },
    {
      id: 5,
      title: 'Component Patterns',
      duration: '2 min',
      content: `
        <p>Figma's component library follows consistent patterns that make their UI predictable and pleasant. Here are the key patterns:</p>
        <h4>Cards</h4>
        <pre><code>.card {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}</code></pre>
        <h4>Buttons</h4>
        <p>Figma uses two button styles: <strong>primary</strong> (filled accent) and <strong>secondary</strong> (outlined). Both use the same border-radius and padding for consistency.</p>
        <pre><code>.btn-primary {
  background: #4d49fc;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 15px;
  transition: opacity 0.2s;
}

.btn-secondary {
  background: transparent;
  color: #000;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 12px 24px;
}</code></pre>
        <h4>Pills / Tags</h4>
        <ul>
          <li>Border radius: 50px (fully rounded)</li>
          <li>Active state: black bg, white text</li>
          <li>Inactive: light gray bg (#f0f0f0)</li>
          <li>No borders needed — background color creates distinction</li>
        </ul>
      `
    },
    {
      id: 6,
      title: 'Layout Patterns',
      duration: '2 min',
      content: `
        <p>Figma's layouts are deceptively simple. They rely on a few key patterns used consistently:</p>
        <h4>Content Width</h4>
        <table>
          <thead>
            <tr><th>Context</th><th>Max Width</th><th>Use Case</th></tr>
          </thead>
          <tbody>
            <tr><td>Full layout</td><td>1200px</td><td>Homepage, grid sections</td></tr>
            <tr><td>Reading content</td><td>720px</td><td>Articles, documentation</td></tr>
            <tr><td>Narrow content</td><td>560px</td><td>Forms, hero descriptions</td></tr>
          </tbody>
        </table>
        <h4>Grid System</h4>
        <pre><code>/* Responsive grid */
.grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
}

/* On mobile: single column */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}</code></pre>
        <p>The auto-fill approach means the grid naturally adapts from 3 columns on desktop to 2 on tablet to 1 on mobile — no breakpoint gymnastics required.</p>
        <h4>Sidebar + Content Pattern</h4>
        <ul>
          <li>Sidebar: 280px fixed width, left-aligned</li>
          <li>Content: fluid width, max-width constrained</li>
          <li>On mobile: sidebar becomes a slide-in overlay</li>
          <li>Hamburger button: fixed bottom-left, 48px, accent color</li>
        </ul>
      `
    },
    {
      id: 7,
      title: 'Motion & Interactions',
      duration: '1 min',
      content: `
        <p>Figma's approach to animation follows the same minimalist philosophy as their visual design. Motion is functional, not decorative.</p>
        <h4>Timing Functions</h4>
        <pre><code>/* Figma's preferred easing */
.element {
  /* For entrances and emphasis */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* For exits and de-emphasis */
  transition: all 0.2s ease-out;
  
  /* For hover states */
  transition: all 0.15s ease;
}</code></pre>
        <h4>Animation Principles</h4>
        <ul>
          <li><strong>Subtle transforms</strong> — hover lifts of 2-3px, never more</li>
          <li><strong>Fade-in-up for content</strong> — 20px translateY with 0.5s duration</li>
          <li><strong>Staggered delays</strong> — 0.1s between siblings for a cascade effect</li>
          <li><strong>No bouncing, no overshooting</strong> — clean, professional easing</li>
          <li><strong>Progress bars animate smoothly</strong> — 0.3s ease transition on width</li>
        </ul>
        <blockquote><p>The best animations are the ones users don't consciously notice. They just make things feel "right."</p></blockquote>
      `
    },
    {
      id: 8,
      title: 'Responsive Strategy',
      duration: '2 min',
      content: `
        <p>Figma's responsive design is mobile-first in philosophy but desktop-optimized in execution. Here's their breakpoint strategy:</p>
        <h4>Breakpoints</h4>
        <table>
          <thead>
            <tr><th>Breakpoint</th><th>Target</th><th>Key Changes</th></tr>
          </thead>
          <tbody>
            <tr><td>&lt; 768px</td><td>Mobile</td><td>Single column, hamburger nav, 16px padding</td></tr>
            <tr><td>768-1024px</td><td>Tablet</td><td>2 columns, condensed spacing</td></tr>
            <tr><td>&gt; 1024px</td><td>Desktop</td><td>Full layout, sidebar visible, 48px padding</td></tr>
          </tbody>
        </table>
        <h4>Mobile-Specific Patterns</h4>
        <ul>
          <li><strong>Touch targets: 44px minimum</strong> — Apple's HIG recommendation</li>
          <li><strong>Font scaling</strong> — H1 drops from 56px to 32-36px on mobile</li>
          <li><strong>Padding reduction</strong> — 48px desktop → 16px mobile</li>
          <li><strong>Sidebar → overlay</strong> — saves horizontal space on small screens</li>
          <li><strong>Cards stack vertically</strong> — single column on mobile for easy scrolling</li>
        </ul>
        <pre><code>/* Key responsive adjustments */
@media (max-width: 768px) {
  .sidebar { display: none; }
  .hamburger { display: flex; }
  
  h1 {
    font-size: 36px !important;
    letter-spacing: -0.5px !important;
  }
  
  .container {
    padding: 0 16px;
  }
}</code></pre>
      `
    },
    {
      id: 9,
      title: 'Accessibility Considerations',
      duration: '1 min',
      content: `
        <p>Clean design and accessibility go hand in hand. Figma's approach naturally supports accessibility through several patterns:</p>
        <h4>Color Contrast</h4>
        <ul>
          <li><strong>#000 on #fff</strong> — 21:1 ratio (maximum possible)</li>
          <li><strong>#697485 on #fff</strong> — 4.7:1 ratio (passes AA for large text)</li>
          <li><strong>#4d49fc on #fff</strong> — 4.6:1 ratio (passes AA for large text)</li>
        </ul>
        <h4>Keyboard Navigation</h4>
        <p>Focus indicators use the accent color with a 3px box-shadow ring:</p>
        <pre><code>*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(77, 73, 252, 0.3);
  border-radius: inherit;
}</code></pre>
        <h4>Semantic HTML</h4>
        <p>Every design decision should translate to proper HTML semantics:</p>
        <ul>
          <li>Mono labels → <code>&lt;span class="mono-label"&gt;</code> with aria attributes</li>
          <li>Section navigation → <code>&lt;nav&gt;</code> with proper landmark roles</li>
          <li>Progress bars → <code>role="progressbar"</code> with aria-valuenow</li>
          <li>Code blocks → <code>&lt;pre&gt;&lt;code&gt;</code> for proper semantics</li>
        </ul>
      `
    },
    {
      id: 10,
      title: 'Putting It All Together',
      duration: '1 min',
      content: `
        <p>Figma's design system teaches us that <strong>great design is about subtraction, not addition</strong>. Every element earns its place through function, not decoration.</p>
        <h4>The Checklist</h4>
        <p>When building a Figma-inspired interface, validate against these principles:</p>
        <ul>
          <li>✅ Is every color functional? Remove decorative colors.</li>
          <li>✅ Does every heading have negative letter-spacing?</li>
          <li>✅ Are mono labels uppercase with positive tracking?</li>
          <li>✅ Is the content width constrained (720px for reading)?</li>
          <li>✅ Do cards have subtle borders and hover lift?</li>
          <li>✅ Is white space generous enough? Add more if unsure.</li>
          <li>✅ Do animations feel invisible? They should enhance, not distract.</li>
          <li>✅ Is the mobile experience touch-friendly (44px+ targets)?</li>
        </ul>
        <blockquote><p>The goal isn't to copy Figma — it's to internalize their principles. Restraint, clarity, and purposeful design will elevate any project.</p></blockquote>
        <p>Apply these principles to your next project. Start with the typography. Get the type scale right, add generous white space, keep your color palette to 4-5 colors max, and you'll be 80% of the way to a beautiful, functional design.</p>
      `
    },
  ],
}
