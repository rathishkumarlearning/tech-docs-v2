import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Menu, X, Copy, CheckCheck, BookOpen } from 'lucide-react'
import { getDoc, docs } from '../docs'

/* ============ Progress Hook (localStorage) ============ */
function useProgress(slug: string, total: number) {
  const [done, setDone] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem(`td-progress-${slug}`) || '[]') }
    catch { return [] }
  })
  const toggle = useCallback((id: number) => setDone(prev => {
    const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    localStorage.setItem(`td-progress-${slug}`, JSON.stringify(next))
    return next
  }), [slug])
  const pct = total > 0 ? Math.round((done.length / total) * 100) : 0
  return { done, toggle, pct }
}

/* ============ Copy Button for Code Blocks ============ */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="copy-button" style={{ opacity: 1 }}>
      {copied ? <><CheckCheck size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
    </button>
  )
}

/* ============ Sidebar Content (shared desktop/mobile) ============ */
function SidebarContent({
  sections, activeSection, completedSections, onSectionClick, onToggleComplete, pct,
}: {
  sections: { id: number; title: string; duration: string }[]
  activeSection: number
  completedSections: number[]
  onSectionClick: (id: number) => void
  onToggleComplete: (id: number) => void
  pct: number
}) {
  return (
    <div>
      <p className="mono-label" style={{ marginBottom: 20, paddingLeft: 16 }}>Sections</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sections.map((s, i) => {
          const isActive = activeSection === s.id
          const isComplete = completedSections.includes(s.id)
          return (
            <div
              key={s.id}
              className={`sidebar-section ${isActive ? 'active' : ''}`}
              onClick={() => onSectionClick(s.id)}
            >
              <div className="active-dot" />
              <span className="section-number">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="section-title">{s.title}</div>
                <div className="section-duration">{s.duration}</div>
              </div>
              <button
                className={`checkmark-btn ${isComplete ? 'completed' : ''}`}
                onClick={(e) => { e.stopPropagation(); onToggleComplete(s.id) }}
              >
                {isComplete && <Check size={12} color="#fff" />}
              </button>
            </div>
          )
        })}
      </div>

      {/* Progress */}
      <div style={{ marginTop: 32, padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="mono-label">Progress</span>
          <span className="mono-label" style={{ color: pct === 100 ? 'var(--color-success)' : 'var(--color-meta)' }}>
            {pct}%
          </span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

/* ============ Main Reader ============ */
export default function Reader() {
  const { slug } = useParams<{ slug: string }>()
  const doc = getDoc(slug || '')
  const [activeSection, setActiveSection] = useState(1)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const sectionRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const contentRef = useRef<HTMLDivElement>(null)

  const { done, toggle, pct } = useProgress(slug || '', doc?.sections.length || 0)

  // Reading progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setReadingProgress(Math.min(100, progress))

      // Update active section based on scroll
      if (doc) {
        let current = doc.sections[0]?.id || 1
        for (const section of doc.sections) {
          const el = sectionRefs.current.get(section.id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top <= 150) current = section.id
          }
        }
        setActiveSection(current)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [doc])

  // Add copy buttons to code blocks after render
  useEffect(() => {
    if (!contentRef.current) return
    const pres = contentRef.current.querySelectorAll('pre')
    pres.forEach(pre => {
      if (pre.parentElement?.classList.contains('code-block-wrapper')) return
      const wrapper = document.createElement('div')
      wrapper.className = 'code-block-wrapper'
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      const btn = document.createElement('button')
      btn.className = 'copy-button'
      btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy'
      btn.onclick = async () => {
        const code = pre.querySelector('code')?.textContent || pre.textContent || ''
        await navigator.clipboard.writeText(code)
        btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied'
        setTimeout(() => {
          btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy'
        }, 2000)
      }
      wrapper.appendChild(btn)
    })
  }, [doc, activeSection])

  const scrollToSection = (id: number) => {
    const el = sectionRefs.current.get(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
      setMobileOpen(false)
    }
  }

  if (!doc) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Document not found</h2>
          <Link to="/" style={{ color: 'var(--color-accent)', fontSize: 16 }}>← Back to all docs</Link>
        </div>
      </div>
    )
  }

  // Find prev/next docs
  const currentIdx = docs.findIndex(d => d.slug === slug)
  const prevDoc = currentIdx > 0 ? docs[currentIdx - 1] : null
  const nextDoc = currentIdx < docs.length - 1 ? docs[currentIdx + 1] : null

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Reading Progress */}
      <div className="reading-progress" style={{ width: `${readingProgress}%` }} />

      {/* Desktop Sidebar */}
      <nav className="sidebar">
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 32, color: 'var(--color-meta)', fontSize: 14,
        }}>
          <ArrowLeft size={16} />
          <span>All Docs</span>
        </Link>
        <SidebarContent
          sections={doc.sections}
          activeSection={activeSection}
          completedSections={done}
          onSectionClick={scrollToSection}
          onToggleComplete={toggle}
          pct={pct}
        />
      </nav>

      {/* Mobile Hamburger */}
      <button className="hamburger-btn" onClick={() => setMobileOpen(true)}>
        <Menu size={22} />
      </button>

      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'open' : ''}`}
        style={{ display: mobileOpen ? 'block' : undefined }}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`mobile-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-meta)', fontSize: 14 }}>
            <ArrowLeft size={16} /> All Docs
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <X size={20} color="var(--color-meta)" />
          </button>
        </div>
        <SidebarContent
          sections={doc.sections}
          activeSection={activeSection}
          completedSections={done}
          onSectionClick={scrollToSection}
          onToggleComplete={toggle}
          pct={pct}
        />
      </div>

      {/* Main Content */}
      <div className="reader-main" style={{ marginLeft: 'var(--sidebar-width)' }}>
        {/* Header */}
        <div style={{
          padding: '100px 48px 48px',
          maxWidth: 780,
          margin: '0 auto',
        }} className="reader-content-area">
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'var(--color-meta)', fontSize: 14, marginBottom: 24,
          }}>
            <ArrowLeft size={16} /> Back
          </Link>

          <p className="mono-label fade-in-up" style={{ marginBottom: 12 }}>
            {doc.category}
          </p>
          <h1 className="reader-header-title fade-in-up fade-in-up-delay-1" style={{
            fontFamily: 'var(--font-sans)', fontSize: 42, fontWeight: 700,
            letterSpacing: '-0.84px', lineHeight: 1.1, color: '#000', marginBottom: 16,
          }}>
            {doc.title}
          </h1>
          <p className="fade-in-up fade-in-up-delay-2" style={{
            fontSize: 18, lineHeight: 1.6, color: 'var(--color-meta)',
            marginBottom: 24, maxWidth: 600,
          }}>
            {doc.description}
          </p>
          <div className="mono-label fade-in-up fade-in-up-delay-3" style={{
            display: 'flex', gap: 16, flexWrap: 'wrap',
          }}>
            <span>{doc.author}</span>
            <span>·</span>
            <span>{doc.date}</span>
            <span>·</span>
            <span>{doc.readTime}</span>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '0 48px' }} />

        {/* Sections */}
        <div ref={contentRef} className="reader-content-area" style={{
          maxWidth: 780, margin: '0 auto', padding: '48px 48px 80px',
        }}>
          {doc.sections.map((section, i) => (
            <div
              key={section.id}
              ref={el => { if (el) sectionRefs.current.set(section.id, el) }}
              style={{ scrollMarginTop: 80 }}
            >
              {i > 0 && <hr className="section-divider" />}

              {/* Section Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24,
              }}>
                <span className="mono-label" style={{
                  background: 'var(--color-surface)', padding: '4px 10px',
                  borderRadius: 8, fontSize: 11,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 600,
                  letterSpacing: '-0.4px', color: '#000', flex: 1,
                }}>
                  {section.title}
                </h2>
                <span className="mono-label" style={{
                  background: 'var(--color-surface)', padding: '4px 10px',
                  borderRadius: 8, fontSize: 11, flexShrink: 0,
                }}>
                  {section.duration}
                </span>
              </div>

              {/* Section Content (HTML) */}
              <div
                className="reader-content"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}

          {/* Prev/Next Navigation */}
          <div style={{
            display: 'flex', gap: 16, marginTop: 80,
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          }}>
            {prevDoc ? (
              <Link to={`/doc/${prevDoc.slug}`} className="nav-card" style={{ textAlign: 'left' }}>
                <div className="mono-label" style={{ marginBottom: 8 }}>
                  <ChevronLeft size={14} style={{ display: 'inline', verticalAlign: 'middle' }} /> Previous
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#000' }}>{prevDoc.title}</div>
              </Link>
            ) : <div style={{ flex: 1 }} />}
            {nextDoc ? (
              <Link to={`/doc/${nextDoc.slug}`} className="nav-card" style={{ textAlign: 'right' }}>
                <div className="mono-label" style={{ marginBottom: 8 }}>
                  Next <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#000' }}>{nextDoc.title}</div>
              </Link>
            ) : <div style={{ flex: 1 }} />}
          </div>

          {/* Back to all docs */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: 'var(--color-accent)', fontSize: 15, fontWeight: 500,
            }}>
              <BookOpen size={16} /> Back to all docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
