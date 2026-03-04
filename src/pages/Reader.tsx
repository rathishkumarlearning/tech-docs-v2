import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDoc, docs } from '../docs'

export default function Reader() {
  const { slug } = useParams<{ slug: string }>()
  const doc = getDoc(slug || '')
  const [activeSection, setActiveSection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Prev/Next docs
  const currentIndex = docs.findIndex(d => d.slug === slug)
  const prevDoc = currentIndex > 0 ? docs[currentIndex - 1] : null
  const nextDoc = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for active section
  useEffect(() => {
    if (!doc) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx >= 0) setActiveSection(idx)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    sectionRefs.current.forEach(ref => ref && observer.observe(ref))
    return () => observer.disconnect()
  }, [doc])

  if (!doc) {
    return (
      <div style={{ padding: 48, textAlign: 'center' }}>
        <h2>Document not found</h2>
        <Link to="/" style={{ color: '#4d49fc' }}>← Back to home</Link>
      </div>
    )
  }

  const scrollToSection = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setSidebarOpen(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Progress bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: `${progress}%`,
        background: '#4d49fc',
        zIndex: 200,
        transition: 'width 0.1s linear',
      }} />

      {/* Header */}
      <header style={{
        background: '#f3ffe3',
        padding: '48px 20px 56px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Link to="/" style={{
            textDecoration: 'none',
            fontSize: 14,
            color: '#697485',
            display: 'inline-block',
            marginBottom: 20,
          }}>
            ← Back to articles
          </Link>
          <p className="mono-label" style={{ marginBottom: 12 }}>{doc.category}</p>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 600,
            letterSpacing: '-0.84px',
            lineHeight: 1.15,
            marginBottom: 16,
          }}>
            {doc.title}
          </h1>
          <p style={{ fontSize: 18, color: '#697485', lineHeight: 1.6, maxWidth: 600, marginBottom: 20 }}>
            {doc.description}
          </p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <span className="mono-label">{doc.author}</span>
            <span className="mono-label">{doc.readTime}</span>
            <span className="mono-label">{doc.date}</span>
            <span className="mono-label">{doc.sections.length} sections</span>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div style={{
        display: 'flex',
        maxWidth: 1120,
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Desktop Sidebar */}
        <aside style={{
          width: 280,
          flexShrink: 0,
          position: 'sticky',
          top: 20,
          alignSelf: 'flex-start',
          padding: '40px 24px',
          display: 'none',
        }} className="desktop-sidebar">
          <p className="mono-label" style={{ marginBottom: 20 }}>Sections</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {doc.sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  background: 'none',
                  border: 'none',
                  borderLeft: activeSection === i ? '3px solid #4d49fc' : '3px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  fontWeight: activeSection === i ? 600 : 400,
                  color: activeSection === i ? '#1a1a1a' : '#697485',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  borderRadius: '0 6px 6px 0',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: '#697485',
                  minWidth: 20,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ lineHeight: 1.3 }}>{s.title}</span>
              </button>
            ))}
          </nav>
          <div style={{
            marginTop: 24,
            padding: '12px 0',
            borderTop: '1px solid #e8e8e8',
          }}>
            <span className="mono-label">{Math.round(progress)}% complete</span>
          </div>
        </aside>

        {/* Content */}
        <main style={{
          flex: 1,
          maxWidth: 720,
          margin: '0 auto',
          padding: '48px 20px 80px',
        }}>
          {doc.sections.map((section, i) => (
            <div
              key={section.id}
              ref={el => { sectionRefs.current[i] = el }}
              style={{
                paddingTop: 8,
                marginBottom: 0,
              }}
            >
              {i > 0 && (
                <hr style={{
                  border: 'none',
                  borderTop: '1px solid #e8e8e8',
                  margin: '48px 0',
                }} />
              )}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 24,
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: '#697485',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 style={{
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: '-0.24px',
                  flex: 1,
                }}>
                  {section.title}
                </h2>
                <span className="mono-label" style={{
                  background: '#f5f5f0',
                  padding: '4px 10px',
                  borderRadius: 8,
                  flexShrink: 0,
                }}>
                  {section.duration}
                </span>
              </div>
              <div
                className="reader-content"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}

          {/* Prev/Next */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid #e8e8e8',
            flexWrap: 'wrap',
          }}>
            {prevDoc ? (
              <Link to={`/doc/${prevDoc.slug}`} style={{
                textDecoration: 'none',
                padding: '16px 20px',
                border: '1px solid #e8e8e8',
                borderRadius: 12,
                flex: 1,
                minWidth: 200,
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#4d49fc'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e8e8'}
              >
                <span className="mono-label">Previous</span>
                <p style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>{prevDoc.title}</p>
              </Link>
            ) : <div />}
            {nextDoc ? (
              <Link to={`/doc/${nextDoc.slug}`} style={{
                textDecoration: 'none',
                padding: '16px 20px',
                border: '1px solid #e8e8e8',
                borderRadius: 12,
                flex: 1,
                minWidth: 200,
                textAlign: 'right',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#4d49fc'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e8e8'}
              >
                <span className="mono-label">Next</span>
                <p style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>{nextDoc.title}</p>
              </Link>
            ) : <div />}
          </div>
        </main>
      </div>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#1a1a1a',
          color: '#fff',
          border: 'none',
          fontSize: 20,
          cursor: 'pointer',
          zIndex: 150,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="mobile-sidebar-toggle"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(4px)',
              zIndex: 160,
            }}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: 300,
            background: '#fff',
            zIndex: 170,
            padding: '32px 24px',
            overflowY: 'auto',
            boxShadow: '4px 0 30px rgba(0,0,0,0.1)',
          }}>
            <p className="mono-label" style={{ marginBottom: 20 }}>Sections</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {doc.sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    background: 'none',
                    border: 'none',
                    borderLeft: activeSection === i ? '3px solid #4d49fc' : '3px solid transparent',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    fontWeight: activeSection === i ? 600 : 400,
                    color: activeSection === i ? '#1a1a1a' : '#697485',
                    textAlign: 'left',
                    borderRadius: '0 6px 6px 0',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: '#697485',
                    minWidth: 20,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ lineHeight: 1.3 }}>{s.title}</span>
                </button>
              ))}
            </nav>
            <div style={{
              marginTop: 24,
              padding: '12px 0',
              borderTop: '1px solid #e8e8e8',
            }}>
              <span className="mono-label">{Math.round(progress)}% complete</span>
            </div>
          </div>
        </>
      )}

      {/* CSS for desktop sidebar visibility */}
      <style>{`
        .desktop-sidebar { display: none !important; }
        .mobile-sidebar-toggle { display: flex !important; }
        @media (min-width: 1024px) {
          .desktop-sidebar { display: block !important; }
          .mobile-sidebar-toggle { display: none !important; }
        }
      `}</style>
    </div>
  )
}
