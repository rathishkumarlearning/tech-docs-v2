import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen, Layers, Clock } from 'lucide-react'
import { docs } from '../docs'

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(() => Array.from(new Set(docs.map(d => d.category))), [])

  const filtered = useMemo(() => {
    return docs.filter(d => {
      const s = search.toLowerCase()
      const matchesSearch = !search ||
        d.title.toLowerCase().includes(s) ||
        d.description.toLowerCase().includes(s) ||
        d.tags.some(t => t.toLowerCase().includes(s))
      const matchesCat = !activeCategory || d.category === activeCategory
      return matchesSearch && matchesCat
    })
  }, [search, activeCategory])

  const totalArticles = docs.length
  const totalCategories = categories.length

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 64,
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <BookOpen size={20} style={{ color: 'var(--color-accent)' }} />
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 600,
            letterSpacing: '-0.3px', color: '#000',
          }}>Tech Docs</span>
        </Link>
        <span className="mono-label">{totalArticles} Articles</span>
      </header>

      {/* Main */}
      <main className="home-container" style={{
        maxWidth: 1200, margin: '0 auto', padding: '140px 48px 120px',
      }}>
        {/* Hero */}
        <div className="home-hero fade-in-up" style={{ marginBottom: 64 }}>
          <p className="mono-label" style={{ marginBottom: 20 }}>
            Curated Technical Knowledge
          </p>
          <h1 style={{
            fontFamily: 'var(--font-sans)', fontSize: 56, fontWeight: 600,
            letterSpacing: '-0.84px', lineHeight: 1.05, color: '#000', marginBottom: 16,
          }}>
            Tech Docs
          </h1>
          <p style={{
            fontSize: 18, fontWeight: 400, lineHeight: '28px',
            color: 'var(--color-meta)', maxWidth: 520, marginBottom: 32,
          }}>
            A collection of deeply researched technical articles, design systems,
            and engineering knowledge — distilled for clarity.
          </p>

          {/* Stats */}
          <div className="mono-label fade-in-up fade-in-up-delay-1" style={{
            display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={14} /> {totalArticles} ARTICLES
            </span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Layers size={14} /> {totalCategories} CATEGORIES
            </span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} /> UPDATED DAILY
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="fade-in-up fade-in-up-delay-2" style={{ position: 'relative', marginBottom: 24 }}>
          <Search size={18} style={{
            position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
            color: '#b0b0b0', pointerEvents: 'none',
          }} />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category Pills */}
        <div className="fade-in-up fade-in-up-delay-3" style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48,
        }}>
          <button
            onClick={() => setActiveCategory(null)}
            className={`category-pill ${!activeCategory ? 'active' : ''}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Doc Grid */}
        <div className="fade-in-up fade-in-up-delay-4" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {filtered.map(doc => (
            <Link key={doc.slug} to={`/doc/${doc.slug}`}>
              <div className="doc-card">
                <span className="mono-label" style={{ display: 'block', marginBottom: 16 }}>
                  {doc.category}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-sans)', fontSize: 22, fontWeight: 600,
                  letterSpacing: '-0.24px', lineHeight: 1.3, color: '#000', marginBottom: 12,
                }}>
                  {doc.title}
                </h3>
                <p style={{
                  fontSize: 16, lineHeight: 1.6, color: 'var(--color-meta)',
                  marginBottom: 20, fontWeight: 400,
                }}>
                  {doc.description}
                </p>
                <div className="mono-label" style={{ display: 'flex', gap: 12 }}>
                  <span>{doc.readTime}</span>
                  <span>·</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '80px 0',
            color: 'var(--color-meta)', fontSize: 16,
          }}>
            No articles found matching your search.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-border)', padding: '32px 48px',
        textAlign: 'center',
      }}>
        <p className="mono-label">
          Built with care · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
