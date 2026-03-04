import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDoc, docs } from '../docs'

export default function Reader() {
  const { slug } = useParams<{ slug: string }>()
  const doc = getDoc(slug || '')
  const [activeSection, setActiveSection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [claps, setClaps] = useState(Math.floor(Math.random() * 800) + 50)
  const [bookmarked, setBookmarked] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const currentIndex = docs.findIndex(d => d.slug === slug)
  const prevDoc = currentIndex > 0 ? docs[currentIndex - 1] : null
  const nextDoc = currentIndex < docs.length - 1 ? docs[currentIndex + 1] : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <div style={{ padding: 48, textAlign: 'center', fontFamily: 'var(--font-ui)' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: 16 }}>Document not found</h2>
        <Link to="/" style={{ color: 'var(--green)' }}>← Back to home</Link>
      </div>
    )
  }

  const scrollToSection = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const authorInitials = doc.author.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: 'var(--font-ui)' }}>

      {/* Progress bar */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        height: 3,
        width: `${progress}%`,
        background: '#000',
        zIndex: 200,
        transition: 'width 0.1s linear',
      }} />

      {/* Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'var(--cream)',
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        height: 57,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          fontFamily: 'var(--font-serif)',
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--dark)',
          letterSpacing: '-0.3px',
        }}>
          Tech Docs
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => setBookmarked(b => !b)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 18, color: bookmarked ? 'var(--dark)' : 'var(--text-muted)',
            }}
            title="Bookmark"
          >
            {bookmarked ? '🔖' : '🔖'}
          </button>
          <Link to="/" style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 14,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
          }}>
            ← All articles
          </Link>
        </div>
      </nav>

      {/* Page layout */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        gap: 80,
        alignItems: 'flex-start',
      }}>

        {/* MAIN CONTENT — 680px centered */}
        <main style={{
          flex: 1,
          maxWidth: 680,
          margin: '0 auto',
          paddingTop: 56,
          paddingBottom: 80,
          minWidth: 0,
        }}>

          {/* Article header */}
          <header style={{ marginBottom: 40 }}>
            {/* Category tag */}
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              color: 'var(--green)',
              display: 'block',
              marginBottom: 16,
            }}>
              {doc.category}
            </span>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 42,
              fontWeight: 700,
              letterSpacing: '-0.5px',
              lineHeight: '52px',
              color: 'var(--dark)',
              marginBottom: 16,
            }}>
              {doc.title}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 22,
              fontWeight: 400,
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: 28,
            }}>
              {doc.description}
            </p>

            {/* Author row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--dark)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                fontWeight: 600,
                flexShrink: 0,
              }}>
                {authorInitials}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--dark)',
                }}>
                  {doc.author}
                </div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 14,
                  color: 'var(--text-muted)',
                }}>
                  {doc.date} · {doc.readTime}
                </div>
              </div>
            </div>

            {/* Social actions row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              paddingBottom: 24,
              borderBottom: '1px solid rgba(0,0,0,0.1)',
            }}>
              <button
                onClick={() => setClaps(c => c + 1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  padding: 0,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--dark)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <span style={{ fontSize: 20 }}>👏</span> {claps}
              </button>
              <button
                onClick={() => setBookmarked(b => !b)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-ui)', fontSize: 14,
                  color: bookmarked ? 'var(--dark)' : 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center', gap: 6, padding: 0,
                }}
              >
                <span style={{ fontSize: 18 }}>🔖</span> Save
              </button>
              <button
                onClick={() => navigator.share?.({ title: doc.title, url: window.location.href }).catch(() => {})}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-ui)', fontSize: 14,
                  color: 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center', gap: 6, padding: 0,
                }}
              >
                <span style={{ fontSize: 18 }}>↗</span> Share
              </button>
            </div>

            {/* Hero image placeholder */}
            <div style={{
              width: '100%',
              height: 380,
              background: `linear-gradient(135deg, #e8f0fe 0%, #c3d5f5 100%)`,
              marginTop: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 40,
                fontWeight: 700,
                color: 'rgba(0,0,0,0.12)',
              }}>
                {doc.title.split(' ').slice(0, 3).join(' ')}
              </span>
            </div>
          </header>

          {/* Article body — sections */}
          <div className="article-body">
            {doc.sections.map((section: any, i: number) => (
              <div
                key={section.id}
                ref={el => { sectionRefs.current[i] = el }}
              >
                {i > 0 && (
                  <div style={{
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: 24,
                    letterSpacing: 8,
                    margin: '48px 0',
                  }}>
                    ···
                  </div>
                )}
                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 28,
                  fontWeight: 700,
                  marginTop: i === 0 ? 0 : 8,
                  marginBottom: 20,
                  color: 'var(--dark)',
                  letterSpacing: '-0.3px',
                }}>
                  {section.title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            ))}
          </div>

          {/* Author card */}
          <div style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }}>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              color: 'var(--text-muted)',
              marginBottom: 16,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              Written by
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--dark)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-ui)', fontSize: 18, fontWeight: 600,
              }}>
                {authorInitials}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18, fontWeight: 700, color: 'var(--dark)',
                }}>
                  {doc.author}
                </div>
                <div style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 14, color: 'var(--text-muted)', marginTop: 4,
                }}>
                  Technical writer & engineer
                </div>
              </div>
            </div>
          </div>

          {/* More from Chase AI */}
          {(prevDoc || nextDoc) && (
            <div style={{ marginTop: 56 }}>
              <p style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 13,
                color: 'var(--text-muted)',
                marginBottom: 24,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                More from Chase AI
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[prevDoc, nextDoc].filter(Boolean).map((d, i, arr) => d && (
                  <Link key={d.slug} to={`/doc/${d.slug}`} style={{
                    textDecoration: 'none',
                    padding: '20px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                    display: 'block',
                  }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--green)', display: 'block', marginBottom: 6 }}>
                      {d.category}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 20, fontWeight: 700, color: 'var(--dark)',
                      lineHeight: 1.3, display: 'block', marginBottom: 6,
                    }}>
                      {d.title}
                    </span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-muted)' }}>
                      {d.readTime} · {d.date}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Floating TOC — right side, desktop only */}
        <aside style={{
          width: 220,
          flexShrink: 0,
          position: 'sticky',
          top: 80,
          alignSelf: 'flex-start',
          paddingTop: 56,
          paddingBottom: 40,
          display: 'none',
        }} className="reader-toc">
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 16,
          }}>
            Contents
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {doc.sections.map((s: any, i: number) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(i)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderLeft: activeSection === i ? '2px solid var(--dark)' : '2px solid transparent',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  fontWeight: activeSection === i ? 500 : 400,
                  color: activeSection === i ? 'var(--dark)' : 'var(--text-muted)',
                  textAlign: 'left',
                  lineHeight: 1.3,
                  transition: 'all 0.15s ease',
                }}
              >
                {s.title}
              </button>
            ))}
          </nav>
          <div style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: '1px solid var(--border)',
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}>
            {Math.round(progress)}% read
          </div>
        </aside>
      </div>

      <style>{`
        @media (min-width: 1100px) {
          .reader-toc { display: block !important; }
        }
      `}</style>
    </div>
  )
}
