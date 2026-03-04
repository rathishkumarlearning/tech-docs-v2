import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { docs } from '../docs'

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)

  const categories = useMemo(() => {
    const cats = Array.from(new Set(docs.map(d => d.category)))
    return ['All', ...cats]
  }, [])

  const filtered = useMemo(() => {
    return docs.filter(d => {
      const matchesCategory = activeCategory === 'All' || d.category === activeCategory
      const matchesSearch = !search || 
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Navbar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e8e8e8',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.24px' }}>Tech Docs</span>
          <span className="mono-label" style={{ background: '#f3ffe3', padding: '4px 8px', borderRadius: 20, fontSize: 11 }}>
            {docs.length} articles
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" style={{
            textDecoration: 'none',
            background: '#1a1a1a',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
          }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        background: '#f3ffe3',
        padding: '80px 20px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p className="mono-label" style={{ marginBottom: 16 }}>Curated Technical Knowledge</p>
          <h1 style={{
            fontSize: 'clamp(42px, 8vw, 72px)',
            fontWeight: 500,
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Tech Docs
          </h1>
          <p style={{
            fontSize: 18,
            color: '#697485',
            maxWidth: 520,
            lineHeight: 1.6,
            marginBottom: 24,
          }}>
            A curated collection of in-depth technical articles on modern software engineering, design systems, and cloud architecture.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <span className="mono-label">{docs.length} Articles</span>
            <span className="mono-label">{categories.length - 1} Categories</span>
          </div>
        </div>
      </section>

      {/* Search + Filters + Cards */}
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 20px 80px' }}>
        {/* Search */}
        <div style={{ marginBottom: 32 }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 480,
              padding: '14px 20px',
              fontSize: 16,
              border: '1px solid #e8e8e8',
              borderRadius: 12,
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={e => e.target.style.borderColor = '#4d49fc'}
            onBlur={e => e.target.style.borderColor = '#e8e8e8'}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 20,
                border: '1px solid #e8e8e8',
                background: activeCategory === cat ? '#1a1a1a' : '#fff',
                color: activeCategory === cat ? '#fff' : '#1a1a1a',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {filtered.map(doc => (
            <Link
              key={doc.slug}
              to={`/doc/${doc.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid #e8e8e8',
                borderRadius: 16,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                transition: 'all 0.2s ease',
                background: '#fff',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span className="mono-label">{doc.category}</span>
              <h3 style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '-0.24px',
                lineHeight: 1.3,
              }}>
                {doc.title}
              </h3>
              <p style={{
                fontSize: 16,
                color: '#697485',
                lineHeight: 1.5,
                flex: 1,
              }}>
                {doc.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span className="mono-label">{doc.readTime}</span>
                <span className="mono-label">{doc.date}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#697485', padding: 48 }}>
            No articles found matching your criteria.
          </p>
        )}
      </section>
    </div>
  )
}
