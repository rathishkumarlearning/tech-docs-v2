import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { docs } from '../docs'

const TOPICS = ['AI', 'React', 'CSS', 'IAM', 'Design', 'Security', 'Cloud', 'TypeScript']

function getThumbnailBg(category: string) {
  const map: Record<string, string> = {
    'AI Tools': 'linear-gradient(135deg, #e8f4fd 0%, #c3dff5 100%)',
    'React': 'linear-gradient(135deg, #fde8f4 0%, #f5c3df 100%)',
    'CSS': 'linear-gradient(135deg, #e8fde8 0%, #c3f5c3 100%)',
    'IAM': 'linear-gradient(135deg, #fdf3e8 0%, #f5ddc3 100%)',
    'Design': 'linear-gradient(135deg, #f3e8fd 0%, #ddc3f5 100%)',
  }
  return map[category] || 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)'
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(docs.map(d => d.category)))
    return ['All', ...cats]
  }, [])

  const filtered = useMemo(() => {
    return activeCategory === 'All' ? docs : docs.filter(d => d.category === activeCategory)
  }, [activeCategory])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: 'var(--font-ui)' }}>

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
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--dark)',
          letterSpacing: '-0.3px',
        }}>
          Tech Docs
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {categories.slice(1).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: 100,
                border: '1px solid var(--border)',
                background: activeCategory === cat ? 'var(--dark)' : 'transparent',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: 13,
                fontFamily: 'var(--font-ui)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
          <span style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-ui)',
            marginLeft: 8,
          }}>
            {filtered.length} articles
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        background: 'var(--dark)',
        color: '#fff',
        padding: '72px 24px 80px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            Chase AI · Technical Writing
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 7vw, 60px)',
            fontWeight: 400,
            letterSpacing: '-2px',
            lineHeight: 1.1,
            color: '#fff',
          }}>
            Deep Dives into<br />AI & Engineering
          </h1>
          <p style={{
            marginTop: 24,
            fontFamily: 'var(--font-ui)',
            fontSize: 18,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.6,
          }}>
            In-depth technical articles on AI tools, React, IAM security, design systems, and modern engineering.
          </p>
        </div>
      </section>

      {/* Content area: article list + sidebar */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        gap: 80,
        alignItems: 'flex-start',
      }}>

        {/* Article list */}
        <main style={{ flex: 1, minWidth: 0, paddingTop: 40, paddingBottom: 80 }}>
          {filtered.length === 0 && (
            <p style={{ color: 'var(--text-muted)', padding: '48px 0', textAlign: 'center' }}>
              No articles found.
            </p>
          )}
          {filtered.map((doc, i) => (
            <ArticleRow key={doc.slug} doc={doc} isLast={i === filtered.length - 1} />
          ))}
        </main>

        {/* Right sidebar */}
        <aside style={{
          width: 260,
          flexShrink: 0,
          paddingTop: 40,
          paddingBottom: 80,
          display: 'none',
        }} className="home-sidebar">
          {/* Recommended topics */}
          <div style={{ marginBottom: 40 }}>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--dark)',
              marginBottom: 16,
            }}>
              Recommended topics
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {TOPICS.map(t => (
                <span key={t} style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: 'var(--dark)',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 100,
                  padding: '6px 14px',
                  cursor: 'pointer',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Staff picks */}
          <div>
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--dark)',
              marginBottom: 16,
            }}>
              Staff picks
            </p>
            {docs.slice(0, 3).map(doc => (
              <Link key={doc.slug} to={`/doc/${doc.slug}`} style={{
                display: 'block',
                textDecoration: 'none',
                marginBottom: 20,
              }}>
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  color: 'var(--green)',
                  display: 'block',
                  marginBottom: 4,
                }}>
                  {doc.category}
                </span>
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--dark)',
                  lineHeight: 1.3,
                  display: 'block',
                }}>
                  {doc.title}
                </span>
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginTop: 4,
                }}>
                  {doc.readTime}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .home-sidebar { display: block !important; }
        }
      `}</style>
    </div>
  )
}

function ArticleRow({ doc, isLast }: { doc: any; isLast: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/doc/${doc.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 24,
        padding: '24px 0',
        borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.1)',
      }}>
        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 13,
            color: 'var(--green)',
            display: 'block',
            marginBottom: 8,
          }}>
            {doc.category}
          </span>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-0.3px',
            color: hovered ? 'var(--green)' : 'var(--dark)',
            marginBottom: 8,
            transition: 'color 0.15s ease',
          }}>
            {doc.title}
          </h2>
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 16,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: 16,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {doc.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-muted)' }}>
              {doc.author}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}> · </span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-muted)' }}>
              {doc.readTime}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}> · </span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-muted)' }}>
              {doc.date}
            </span>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 16, color: 'var(--text-muted)' }}>🔖</span>
          </div>
        </div>

        {/* Thumbnail */}
        <div style={{
          width: 160,
          height: 107,
          flexShrink: 0,
          background: getThumbnailBg(doc.category),
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 28,
            fontWeight: 700,
            color: 'rgba(0,0,0,0.15)',
            textAlign: 'center',
            padding: 8,
            lineHeight: 1.1,
          }}>
            {doc.title.split(' ').slice(0, 2).join(' ')}
          </span>
        </div>
      </article>
    </Link>
  )
}
