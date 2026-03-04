import type { Doc } from './index';

export const doc: Doc = {
  slug: 'claude-code-notebooklm',
  title: 'Claude Code + NotebookLM — The Ultimate Free Research Stack',
  description: 'Turn Claude Code into an AI research powerhouse by connecting it to NotebookLM. Scrape YouTube, build knowledge bases, and generate deliverables — all for free.',
  author: 'Chase AI',
  date: '2026-03-02',
  readTime: '14 min read',
  source: 'https://youtu.be/usTeU4Uh0iM',
  category: 'AI Agents',
  tags: ['Claude Code', 'NotebookLM', 'Research', 'YouTube', 'Skills', 'RAG', 'Google', 'Automation'],
  accent: '#0d99ff',
  sections: [
    {
      id: 1,
      title: 'The Research Problem',
      duration: '0:00–1:14',
      content: `<div style="margin-bottom:24px"><img src="diagrams/notebooklm-pipeline.png" alt="NotebookLM Pipeline Architecture" style="width:100%;border-radius:12px;border:1px solid rgba(255,255,255,0.1)" /></div>
<div style="margin-bottom:24px"><img src="diagrams/infographic-notebooklm.png" alt="NotebookLM Research Stack Infographic" style="width:100%;border-radius:12px;border:1px solid rgba(255,255,255,0.1)" /></div>

<h3>Claude Code Is Amazing — But Its Research Game Is Weak</h3>
<p>Here's the thing about Claude Code — it's an incredible coding agent. You can build entire applications, refactor codebases, deploy infrastructure. But when it comes to <strong>research</strong>, it falls short. The built-in web search is basic. You get surface-level results, snippets that barely scratch the surface of a topic.</p>

<p>Chase explains: <em>"If you ask Claude Code to research a topic, it'll do a web search, pull some snippets, and give you a summary. But it's not deep research. It's not structured. It's not grounded in actual source material."</em></p>

<p>What if you could turn Claude Code into a <strong>full-blown research agent</strong> that can:</p>
<ul>
<li>Search YouTube for any topic and find the best videos</li>
<li>Extract all the knowledge from those videos automatically</li>
<li>Build a queryable knowledge base from the content</li>
<li>Generate deliverables like infographics, slide decks, and even podcasts</li>
<li>Do all of this from a single terminal prompt</li>
</ul>

<p>That's exactly what this workflow does. And the best part? <strong>It's completely free.</strong></p>`
    },
    {
      id: 2,
      title: 'NotebookLM: The Secret Weapon',
      duration: '1:15–2:30',
      content: `<h3>Google's Free RAG System That Nobody Talks About</h3>
<p>NotebookLM is Google's source-grounding tool powered by Gemini. Think of it as <strong>a free RAG system</strong> — Retrieval Augmented Generation — without any of the infrastructure headaches.</p>

<blockquote><em>"NotebookLM is basically Google giving you a free vector database, free embeddings, free retrieval — all powered by Gemini. You just throw sources at it and it builds a knowledge base for you."</em> — Chase AI</blockquote>

<p>Here's what makes NotebookLM special:</p>
<ul>
<li><strong>Source-grounded responses</strong> — every answer is tied to your uploaded sources, with citations</li>
<li><strong>Up to 50 sources per notebook</strong> — YouTube videos, PDFs, Google Docs, websites</li>
<li><strong>Powered by Gemini</strong> — Google's latest AI model doing the heavy lifting</li>
<li><strong>Completely free</strong> — no API costs, no token charges, no subscription needed</li>
<li><strong>Built-in deliverables</strong> — audio overviews (podcasts), mind maps, flashcards, study guides</li>
</ul>

<p>The key insight is that NotebookLM doesn't have a public API. But there's an unofficial Python library called <code>notebooklm-py</code> by Tang Ling that gives you programmatic access. This is what makes the entire pipeline possible.</p>

<table style="width:100%;border-collapse:collapse;margin:16px 0">
<tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
<th style="text-align:left;padding:8px;color:rgba(255,255,255,0.5)">Feature</th>
<th style="text-align:left;padding:8px;color:rgba(255,255,255,0.5)">Traditional RAG</th>
<th style="text-align:left;padding:8px;color:rgba(255,255,255,0.5)">NotebookLM</th>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
<td style="padding:8px">Vector Database</td>
<td style="padding:8px">Pinecone/Weaviate ($$$)</td>
<td style="padding:8px">Built-in (free)</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
<td style="padding:8px">Embeddings</td>
<td style="padding:8px">OpenAI/Cohere (per token)</td>
<td style="padding:8px">Gemini (free)</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
<td style="padding:8px">Setup Time</td>
<td style="padding:8px">Hours/Days</td>
<td style="padding:8px">5 minutes</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
<td style="padding:8px">Monthly Cost</td>
<td style="padding:8px">\$50–\$500+</td>
<td style="padding:8px">\$0</td>
</tr>
<tr>
<td style="padding:8px">Deliverables</td>
<td style="padding:8px">Build yourself</td>
<td style="padding:8px">Built-in (podcasts, maps, cards)</td>
</tr>
</table>`
    },
    {
      id: 3,
      title: 'The Pipeline Architecture',
      duration: '2:30–4:00',
      content: `<h3>YouTube → yt-dlp → Claude Code → NotebookLM → Analysis → Deliverables</h3>
<p>The pipeline Chase built is elegantly simple. It chains together a few tools into a seamless research workflow that Claude Code orchestrates from start to finish.</p>

<h3>The Six-Step Flow</h3>
<ol>
<li><strong>YouTube Search (yt-dlp)</strong> — A custom Claude Code skill uses yt-dlp to search YouTube for any topic. It returns video titles, URLs, view counts, and descriptions.</li>
<li><strong>Source Selection</strong> — Claude Code reviews the results and picks the most relevant videos based on view count, relevance, and recency.</li>
<li><strong>NotebookLM Ingestion</strong> — The selected YouTube URLs are pushed into NotebookLM via the notebooklm-py CLI. NotebookLM automatically extracts captions and builds embeddings.</li>
<li><strong>Knowledge Base Query</strong> — Claude Code queries the NotebookLM notebook with specific questions. NotebookLM returns source-grounded answers with citations.</li>
<li><strong>Analysis</strong> — Claude Code synthesizes the responses into structured analysis — trends, comparisons, rankings, insights.</li>
<li><strong>Deliverable Generation</strong> — Finally, Claude Code generates the requested output: infographics, slide decks, study guides, or even audio overviews.</li>
</ol>

<blockquote><em>"The beauty of this pipeline is that the expensive part — the analysis, the RAG, the embeddings — is all offloaded to Google for free. Claude Code is just orchestrating. You save a massive amount of tokens."</em></blockquote>

<p>Each step is handled by a <strong>Claude Code skill</strong> — a simple text file that teaches Claude how to perform a specific task. Skills are just prompts. That's the key insight Chase keeps emphasizing: <em>"Skills are just prompts. It's just text telling Claude Code how to do something in a specific manner."</em></p>`
    },
    {
      id: 4,
      title: 'Demo: One Prompt, Full Research',
      duration: '1:15–4:31',
      content: `<h3>From Zero to Research Report in One Command</h3>
<p>Chase demonstrates the entire pipeline with a single prompt. He asks Claude Code to research "Claude Code skills" — find the best YouTube videos on the topic, analyze them, and generate an infographic.</p>

<p>Here's what happened step by step:</p>
<ol>
<li><strong>Claude Code searched YouTube</strong> using the custom yt-dlp skill and found <strong>20 videos</strong> about Claude Code skills</li>
<li><strong>Reviewed the results</strong> — checked titles, view counts, descriptions to find the most informative ones</li>
<li><strong>Pushed video URLs to NotebookLM</strong> — created a new notebook and added the top videos as sources</li>
<li><strong>NotebookLM processed everything</strong> — extracted captions, built the knowledge base automatically</li>
<li><strong>Queried the notebook</strong> — asked specific questions like "What are the top 5 most impactful Claude Code skills?" and "What trends are emerging?"</li>
<li><strong>Generated an infographic</strong> — a handwritten-style blueprint showing the top skills, their categories, and how they connect</li>
</ol>

<p>The result was a comprehensive analysis that would have taken hours of manual research, delivered in <strong>under 2 minutes</strong>.</p>

<blockquote><em>"One prompt. That's it. I typed one sentence and Claude Code did everything — searched YouTube, found 20 videos, pushed them to NotebookLM, analyzed the content, and generated a beautiful infographic. All from the terminal."</em></blockquote>

<p>The infographic Chase generated had a handwritten blueprint style — like architectural drawings. It listed the top 5 skills with descriptions, use cases, and complexity ratings. All source-grounded from the actual video content.</p>`
    },
    {
      id: 5,
      title: 'Why This Combination Is So Powerful',
      duration: '4:00–5:30',
      content: `<h3>Free, Fast, and Token-Efficient</h3>
<p>Chase breaks down exactly why this Claude Code + NotebookLM combination is a game-changer compared to building your own research infrastructure:</p>

<h3>Cost Comparison</h3>
<table style="width:100%;border-collapse:collapse;margin:16px 0">
<tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
<th style="text-align:left;padding:8px;color:rgba(255,255,255,0.5)">Component</th>
<th style="text-align:left;padding:8px;color:rgba(255,255,255,0.5)">DIY RAG Stack</th>
<th style="text-align:left;padding:8px;color:rgba(255,255,255,0.5)">This Pipeline</th>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
<td style="padding:8px">Vector DB (Pinecone)</td>
<td style="padding:8px">\$70/month</td>
<td style="padding:8px">\$0 (NotebookLM)</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
<td style="padding:8px">Embedding API</td>
<td style="padding:8px">\$20–50/month</td>
<td style="padding:8px">\$0 (Gemini)</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
<td style="padding:8px">Analysis Tokens</td>
<td style="padding:8px">\$30–100/month</td>
<td style="padding:8px">\$0 (offloaded)</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.06)">
<td style="padding:8px">Infrastructure</td>
<td style="padding:8px">\$20–50/month</td>
<td style="padding:8px">\$0</td>
</tr>
<tr style="border-bottom:1px solid rgba(255,255,255,0.1)">
<td style="padding:8px"><strong>Total</strong></td>
<td style="padding:8px"><strong>\$140–270/month</strong></td>
<td style="padding:8px"><strong>\$0/month</strong></td>
</tr>
</table>

<h3>Key Advantages</h3>
<ul>
<li><strong>Zero token cost for analysis</strong> — The heavy lifting (embeddings, retrieval, analysis) is done by Google's Gemini through NotebookLM. Claude Code only orchestrates and formats.</li>
<li><strong>No infrastructure to maintain</strong> — No vector databases to provision, no embedding pipelines to build, no servers to manage.</li>
<li><strong>5-minute setup</strong> — Install two packages, run one login command, add two skill files. Done.</li>
<li><strong>50 sources per notebook</strong> — That's 50 YouTube videos, PDFs, or documents analyzed together in context.</li>
<li><strong>Built-in deliverables</strong> — NotebookLM can generate audio overviews, mind maps, flashcards, and study guides natively.</li>
</ul>

<blockquote><em>"You're replacing a research stack that would cost you hundreds of dollars a month with something that takes 5 minutes to set up and costs literally nothing."</em></blockquote>`
    },
    {
      id: 6,
      title: 'Setting Up YouTube Search Skill',
      duration: '4:32–6:00',
      content: `<h3>Building the yt-dlp YouTube Search Skill</h3>
<p>The first piece of the puzzle is giving Claude Code the ability to search YouTube. Chase uses a custom skill built on <code>yt-dlp</code>, the popular open-source YouTube downloader.</p>

<h3>Option 1: Build It with Claude Code</h3>
<pre><code>// Prompt to Claude Code:
"Build me a YouTube search skill that uses yt-dlp to search
YouTube for a given query and returns the top results with
title, URL, view count, and description."</code></pre>

<p>Claude Code will create a Python script that wraps yt-dlp's search functionality and a skill file (SKILL.md) that teaches Claude how to use it.</p>

<h3>Option 2: Download from Chase's Community</h3>
<p>Chase also offers pre-built skills through his community. The YouTube search skill is a Python script that:</p>
<ul>
<li>Takes a search query as input</li>
<li>Uses <code>yt-dlp --flat-playlist</code> to search YouTube</li>
<li>Returns structured JSON with title, URL, views, upload date, description</li>
<li>Supports filtering by recency, minimum views, and result count</li>
</ul>

<h3>Prerequisites</h3>
<pre><code># Install yt-dlp if you don't have it
pip install yt-dlp

# Or with brew on macOS
brew install yt-dlp</code></pre>

<h3>The Skill File Structure</h3>
<p>The skill lives in your Claude Code skills directory (typically <code>~/.claude/skills/youtube-search/</code>). It contains:</p>
<ul>
<li><code>SKILL.md</code> — The prompt that teaches Claude Code how to use the search script</li>
<li><code>search.py</code> — The Python script that wraps yt-dlp</li>
</ul>

<blockquote><em>"Skills are just prompts. It's just text telling Claude Code how to do something in a specific manner. You can build them yourself, download them, or have Claude Code create them for you."</em></blockquote>`
    },
    {
      id: 7,
      title: 'Connecting NotebookLM',
      duration: '6:00–8:21',
      content: `<h3>Installing notebooklm-py and the NotebookLM Skill</h3>
<p>The second piece is connecting Claude Code to NotebookLM. This is done through <code>notebooklm-py</code>, an unofficial Python API created by Tang Ling that gives you programmatic access to NotebookLM.</p>

<h3>Step 1: Install the Package</h3>
<pre><code># Install notebooklm-py
pip install notebooklm-py</code></pre>

<h3>Step 2: Authenticate</h3>
<pre><code># One-time login via Chrome
notebooklm login</code></pre>
<p>This opens Chrome and authenticates with your Google account. It stores the session cookie locally so you don't need to log in again. It's a one-time setup.</p>

<h3>Step 3: Install the NotebookLM Skill</h3>
<p>Create a skill file that teaches Claude Code how to interact with NotebookLM. The skill covers:</p>
<ul>
<li><strong>Creating notebooks</strong> — <code>notebooklm create "Research Topic"</code></li>
<li><strong>Adding sources</strong> — <code>notebooklm add-source &lt;notebook-id&gt; --url "https://youtube.com/..."</code></li>
<li><strong>Querying</strong> — <code>notebooklm query &lt;notebook-id&gt; "What are the key insights?"</code></li>
<li><strong>Generating deliverables</strong> — <code>notebooklm generate &lt;notebook-id&gt; --type audio-overview</code></li>
</ul>

<h3>What notebooklm-py Can Do</h3>
<ul>
<li>Create and manage notebooks programmatically</li>
<li>Add YouTube URLs, PDFs, Google Docs, and web pages as sources</li>
<li>Query notebooks with natural language questions</li>
<li>Get source-grounded responses with citations</li>
<li>Generate audio overviews (podcast-style summaries)</li>
<li>Generate mind maps, flashcards, study guides</li>
<li>List and delete notebooks</li>
</ul>

<blockquote><em>"NotebookLM doesn't have a public API. That's what makes notebooklm-py so valuable — it's the bridge between Claude Code and Google's free RAG system. Tang Ling built something incredible here."</em></blockquote>`
    },
    {
      id: 8,
      title: 'Walkthrough: Step by Step',
      duration: '8:22–10:07',
      content: `<h3>The Complete Research Flow in Action</h3>
<p>Chase walks through the entire pipeline step by step, showing exactly what happens at each stage when you give Claude Code a research prompt.</p>

<h3>Step 1: Search YouTube</h3>
<pre><code># Claude Code runs the YouTube search skill internally:
python search.py "Claude Code skills" --max-results 20</code></pre>
<p>Returns a JSON array of 20 videos with titles, URLs, view counts, and descriptions.</p>

<h3>Step 2: Review and Select Sources</h3>
<p>Claude Code reviews the search results intelligently — it looks at view counts (higher = more validated), title relevance, upload date (prefers recent), and description keywords. It selects the top 8-10 most relevant videos.</p>

<h3>Step 3: Create NotebookLM Notebook</h3>
<pre><code># Create a new notebook
notebooklm create "Claude Code Skills Research"</code></pre>

<h3>Step 4: Add Sources</h3>
<pre><code># Add each selected video URL
notebooklm add-source &lt;notebook-id&gt; --url "https://youtu.be/video1"
notebooklm add-source &lt;notebook-id&gt; --url "https://youtu.be/video2"
# ... repeat for each video</code></pre>
<p>NotebookLM automatically extracts captions from each YouTube video, processes them, and builds the knowledge base. This happens on Google's servers — no tokens consumed from your Claude quota.</p>

<h3>Step 5: Query the Knowledge Base</h3>
<pre><code># Ask analytical questions
notebooklm query &lt;notebook-id&gt; "What are the top 5 most impactful Claude Code skills?"
notebooklm query &lt;notebook-id&gt; "What trends are emerging in Claude Code skill development?"
notebooklm query &lt;notebook-id&gt; "Compare the different approaches to building skills"</code></pre>

<h3>Step 6: Generate Deliverables</h3>
<p>Claude Code takes the query responses and generates the final output. In the demo, it created a handwritten-style blueprint infographic, but you could request slide decks, study guides, or even have NotebookLM generate an audio overview (podcast).</p>`
    },
    {
      id: 9,
      title: 'Beyond the Basics',
      duration: '10:08–10:45',
      content: `<h3>Advanced Techniques and Possibilities</h3>
<p>Chase briefly touches on advanced use cases that take this pipeline even further:</p>

<h3>Batch Downloads</h3>
<p>Instead of just searching YouTube, you can batch-download transcript data from multiple sources — blog posts, research papers, documentation pages — and push them all into NotebookLM. The 50-source limit per notebook is generous enough for most research projects.</p>

<h3>Multiple Content Types</h3>
<p>NotebookLM isn't limited to YouTube videos. You can add:</p>
<ul>
<li><strong>PDFs</strong> — research papers, whitepapers, ebooks</li>
<li><strong>Google Docs</strong> — your own notes, drafts, outlines</li>
<li><strong>Web pages</strong> — blog posts, documentation, articles</li>
<li><strong>Plain text</strong> — pasted content, transcripts, logs</li>
</ul>

<h3>Flashcard Exports</h3>
<p>NotebookLM can generate flashcards from your sources — perfect for studying or creating educational content. Combined with Claude Code's ability to format and export, you can create Anki-compatible flashcard decks automatically.</p>

<h3>Audio Overviews</h3>
<p>One of NotebookLM's most impressive features is generating podcast-style audio overviews. Two AI hosts discuss your sources in a natural, conversational format. You can use this to create podcast episodes about any research topic.</p>

<h3>The 50-Source Limit</h3>
<p>Each NotebookLM notebook supports up to 50 sources. For larger research projects, you can create multiple notebooks organized by subtopic and have Claude Code query across them.</p>`
    },
    {
      id: 10,
      title: 'Building Your Research Workflow',
      duration: '10:45–11:07',
      content: `<h3>When to Use This vs Direct Research</h3>
<p>Chase wraps up with practical advice on when this pipeline shines versus when you should just research directly:</p>

<h3>Use This Pipeline When:</h3>
<ul>
<li>You need to analyze <strong>multiple sources</strong> on a topic (5+ videos/articles)</li>
<li>You want <strong>source-grounded</strong> analysis with citations</li>
<li>You need to generate <strong>deliverables</strong> (infographics, slides, study materials)</li>
<li>You're doing <strong>comparative analysis</strong> across different perspectives</li>
<li>You want to <strong>save Claude tokens</strong> on the analysis-heavy work</li>
</ul>

<h3>Use Direct Research When:</h3>
<ul>
<li>You need a <strong>quick answer</strong> to a specific question</li>
<li>The topic is <strong>well-documented</strong> in a single source</li>
<li>You need <strong>real-time</strong> information (NotebookLM has ingestion lag)</li>
<li>The research is <strong>code-focused</strong> (documentation, Stack Overflow)</li>
</ul>

<h3>Pro Tips from Chase</h3>
<ul>
<li><strong>Name your notebooks descriptively</strong> — you'll accumulate them quickly</li>
<li><strong>Query with specific questions</strong> — "What are the top 5..." works better than "Tell me about..."</li>
<li><strong>Combine sources strategically</strong> — mix YouTube videos with documentation for the best results</li>
<li><strong>Use audio overviews for review</strong> — listen to podcast summaries while doing other work</li>
<li><strong>Skills are composable</strong> — this pipeline is itself just two skills chained together</li>
</ul>

<blockquote><em>"This is what the future of AI-assisted research looks like. You don't need to build complex infrastructure. You just need to know how to connect the right tools. And with Claude Code skills, connecting tools is literally just writing a text file."</em></blockquote>`
    }
  ]
};
