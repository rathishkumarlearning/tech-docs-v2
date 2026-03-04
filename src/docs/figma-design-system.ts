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
  accent: '#a259ff',
  sections: [
    {
      id: 1,
      title: 'Why Figma\'s Design Stands Out',
      duration: '2 min',
      content: `
        <p>In a world of over-designed interfaces, Figma's website is a breath of fresh air. It doesn't scream for attention — it earns it through clarity, restraint, and purposeful design choices.</p>
        <p>What makes Figma's design remarkable isn't what they added — it's what they removed. No gradients on text. No glassmorphism. No noise overlays. Just clean typography on white space, with occasional pops of their signature purple.</p>
        <blockquote>Great design is as little design as possible. — Dieter Rams</blockquote>
        <p>This philosophy runs through every pixel of Figma's interface. Their website loads fast, reads beautifully on any device, and never makes you squint or scroll unnecessarily. It's the digital equivalent of a well-set table — everything is exactly where you'd expect it to be.</p>
        <p>The key insight: <strong>readability is the ultimate feature</strong>. When your content is easy to consume, users stay longer, understand more, and come back more often.</p>
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
        <p>The rule of thumb: <strong>when in doubt, add more space</strong>. It's far easier to feel crowded than to feel too spacious. White space communicates confidence — it says "we don't need to fill every pixel to prove our value."</p>
        <ul>
          <li>Hero sections: 120px+ vertical padding</li>
          <li>Between sections: 80-100px</li>
          <li>Card gaps: 20-24px</li>
          <li>Content max-width: 740px (like Medium)</li>
        </ul>
      `
    },
    {
      id: 3,
      title: 'Typography That Breathes',
      duration: '2 min',
      content: `
        <p>Figma uses their custom "Figma Sans" typeface, but the closest publicly available alternative is <strong>Plus Jakarta Sans</strong> — a geometric sans-serif with similar proportions and character.</p>
        <p>The magic is in the details: tight letter-spacing on headlines creates a modern, editorial feel. Body text uses lighter weights (330-400) for a gentle, readable texture.</p>
        <pre><code>/* Figma's typography scale */
h1 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 72px;
  font-weight: 400;
  letter-spacing: -1.44px;  /* Tight tracking */
  color: #000000;
}

h3 {
  font-size: 24px;
  font-weight: 520;
  letter-spacing: -0.24px;
}

p {
  font-size: 18px;
  font-weight: 330;         /* Ultra-light body */
  line-height: 1.6;
  color: #1a1a1a;
}</code></pre>
        <p>Notice the weight choices: headings at 400-520 (not bold!), body at 330. This creates a subtle hierarchy without shouting. The negative letter-spacing on headlines pulls characters together for a polished, magazine-quality look.</p>
        <blockquote>Typography is the craft of endowing human language with a durable visual form. — Robert Bringhurst</blockquote>
      `
    },
    {
      id: 4,
      title: 'The Mono Label Pattern',
      duration: '1 min',
      content: `
        <p>One of Figma's most distinctive patterns is their use of monospace text for category labels and metadata. These small, uppercase labels in JetBrains Mono create a clear visual distinction between content and navigation.</p>
        <pre><code>/* The mono label pattern */
.category-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.48px;
  text-transform: uppercase;
  color: #697485;
}</code></pre>
        <p>This pattern works because it creates <strong>three distinct typographic layers</strong>:</p>
        <ol>
          <li><strong>Headlines</strong> — Plus Jakarta Sans, large, black, tight tracking</li>
          <li><strong>Body text</strong> — Plus Jakarta Sans, medium, dark gray, comfortable reading</li>
          <li><strong>Labels/Meta</strong> — JetBrains Mono, small, gray, uppercase, wide tracking</li>
        </ol>
        <p>Each layer is instantly recognizable, making scanning effortless. Users know exactly what's a title, what's content, and what's metadata — without thinking about it.</p>
      `
    },
    {
      id: 5,
      title: 'Color with Purpose',
      duration: '1 min',
      content: `
        <p>Figma's color palette is remarkably restrained. The primary palette is just black and white, with a small set of accent colors used sparingly and meaningfully.</p>
        <table>
          <tr><th>Color</th><th>Hex</th><th>Usage</th></tr>
          <tr><td>Black</td><td>#000000</td><td>Headlines, primary text</td></tr>
          <tr><td>Dark Gray</td><td>#1a1a1a</td><td>Body text</td></tr>
          <tr><td>Meta Gray</td><td>#697485</td><td>Labels, timestamps, secondary info</td></tr>
          <tr><td>Purple</td><td>#a259ff</td><td>Brand accent, interactive elements</td></tr>
          <tr><td>Coral</td><td>#ff7262</td><td>Warnings, highlights</td></tr>
          <tr><td>Blue</td><td>#0d99ff</td><td>Links, info states</td></tr>
          <tr><td>Green</td><td>#14ae5c</td><td>Success, positive indicators</td></tr>
        </table>
        <p>The key principle: <strong>color should convey meaning, not decoration</strong>. Every colored element on Figma's site has a purpose. Purple marks interactive elements. Green means success. Blue is for links. There's no gratuitous use of color.</p>
      `
    },
    {
      id: 6,
      title: 'Card & Component Design',
      duration: '1 min',
      content: `
        <p>Figma's card design is the epitome of "less is more." White background, a subtle 1px border in #e5e5e5, generous 24-32px padding, and 16px border-radius. That's it.</p>
        <pre><code>/* Figma card anatomy */
.card {
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 32px;
  transition: all 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}</code></pre>
        <p>The hover state is equally restrained: a tiny 2px lift and a very soft shadow. No border color changes, no background shifts, no scale transforms. Just a gentle acknowledgment that the element is interactive.</p>
        <p>Inside cards, the typography hierarchy does all the heavy lifting:</p>
        <ul>
          <li>Category label at top (mono, uppercase, gray)</li>
          <li>Title below (Plus Jakarta Sans, 24px, black)</li>
          <li>Description (18px, lighter weight, body color)</li>
          <li>Meta info at bottom (mono, small, gray)</li>
        </ul>
      `
    },
    {
      id: 7,
      title: 'Light vs Dark Theme',
      duration: '2 min',
      content: `
        <p>Figma's website is unapologetically light. While dark themes have their place (code editors, media apps, nighttime reading), Figma chose light because their priority is <strong>content readability</strong>.</p>
        <p>When to use a light theme:</p>
        <ul>
          <li><strong>Content-heavy sites</strong> — articles, documentation, blogs</li>
          <li><strong>Professional tools</strong> — dashboards, admin panels</li>
          <li><strong>E-commerce</strong> — product pages, catalogs</li>
          <li><strong>Print-inspired designs</strong> — portfolios, magazines</li>
        </ul>
        <p>When to use a dark theme:</p>
        <ul>
          <li><strong>Media consumption</strong> — video, photo galleries</li>
          <li><strong>Developer tools</strong> — code editors, terminals</li>
          <li><strong>Gaming & entertainment</strong> — immersive experiences</li>
          <li><strong>Night-mode options</strong> — as an accessibility toggle</li>
        </ul>
        <blockquote>The best theme is the one that serves your content. Don't choose dark because it looks "cool" — choose it because it makes your content shine.</blockquote>
        <p>Figma proves that light themes can be just as striking as dark ones. The key is <strong>contrast management</strong>: pure black on white for headlines, softer grays for body text, and strategic color accents for emphasis.</p>
      `
    },
    {
      id: 8,
      title: 'Applying Figma\'s Principles to Your Apps',
      duration: '2 min',
      content: `
        <p>You don't need to copy Figma's exact styles to benefit from their philosophy. Here's a practical checklist for applying these principles:</p>
        <ol>
          <li><strong>Start with typography</strong> — Choose one sans-serif for content, one monospace for code/labels. Set your scale before anything else.</li>
          <li><strong>Use negative tracking on headlines</strong> — Even -0.5px makes a noticeable difference in polish.</li>
          <li><strong>Embrace white space</strong> — Double whatever padding you think is enough. Then add 20% more.</li>
          <li><strong>Limit your palette</strong> — 2-3 neutrals + 2-3 accent colors. Every color needs a job.</li>
          <li><strong>Subtle borders over shadows</strong> — 1px solid #e5e5e5 is cleaner than most box-shadows.</li>
          <li><strong>Gentle hover states</strong> — translateY(-2px) + soft shadow. That's all you need.</li>
          <li><strong>Mono for meta</strong> — Use monospace for dates, categories, read times. It creates instant hierarchy.</li>
          <li><strong>Content width matters</strong> — 680-740px for readable text. Never go full-width for articles.</li>
        </ol>
        <pre><code>/* Your starter Figma-inspired CSS */
:root {
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --text: #000000;
  --body: #1a1a1a;
  --meta: #697485;
  --border: #e5e5e5;
  --accent: #a259ff;
  --bg-alt: #f5f5f0;
}

.content { max-width: 740px; margin: 0 auto; }
h1 { letter-spacing: -1.44px; font-weight: 400; }
.label { font-family: var(--font-mono); font-size: 12px; 
         text-transform: uppercase; color: var(--meta); }</code></pre>
        <p>The ultimate test: <strong>can someone read your content for 20 minutes without fatigue?</strong> If yes, your design is working. If not, strip away elements until it does.</p>
      `
    }
  ]
}
