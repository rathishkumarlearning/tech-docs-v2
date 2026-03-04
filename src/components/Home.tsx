import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { docs } from '../docs'
import Header from './Header'

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(() => Array.from(new Set(docs.map(d => d.category))), [])

  const filtered = useMemo(() => {
    return docs.filter(d => {
      const matchesSearch = !search ||
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCat = !activeCategory || d.category === activeCategory
      return matchesSearch && matchesCat
    })
  }, [search, activeCategory])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-6xl mx-auto px-6" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="mb-16">
          <p className="font-mono text-[12px] tracking-[0.6px] uppercase text-[#697485] mb-6" style={{ fontWeight: 400 }}>
            Curated Technical Knowledge
          </p>
          <h1 className="text-black mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '72px', fontWeight: 400, letterSpacing: '-1.44px', lineHeight: '72px' }}>
            Tech Docs
          </h1>
          <p className="text-[#697485] max-w-lg" style={{ fontSize: '18px', fontWeight: 330, lineHeight: '25.2px' }}>
            A collection of deeply researched technical articles, design systems, and engineering knowledge.
          </p>
        </div>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search docs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-lg border border-[#e5e5e5] outline-none bg-white transition-colors"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 330 }}
            onFocus={e => e.target.style.borderColor = '#4d49fc'}
            onBlur={e => e.target.style.borderColor = '#e5e5e5'}
          />
        </div>

        <div className="flex gap-2 mb-16 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className="transition-all"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '18px',
              fontWeight: 480,
              padding: '8px 18px 10px',
              borderRadius: '50px',
              border: 'none',
              background: !activeCategory ? '#000' : 'rgba(0,0,0,0.08)',
              color: !activeCategory ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className="transition-all"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '18px',
                fontWeight: 480,
                padding: '8px 18px 10px',
                borderRadius: '50px',
                border: 'none',
                background: activeCategory === cat ? '#000' : 'rgba(0,0,0,0.08)',
                color: activeCategory === cat ? '#fff' : '#000',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doc => (
            <Link key={doc.slug} to={`/doc/${doc.slug}`} className="no-underline group">
              <div
                className="bg-white border border-[#e5e5e5] rounded-2xl p-8 transition-all duration-200 group-hover:-translate-y-0.5"
                style={{ cursor: 'pointer' }}
              >
                <span className="font-mono text-[12px] tracking-[0.6px] uppercase text-[#697485] block mb-4" style={{ fontWeight: 400 }}>
                  {doc.category}
                </span>
                <h3 className="text-black mb-3 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '24px', fontWeight: 520, letterSpacing: '-0.24px', lineHeight: '32.4px' }}>
                  {doc.title}
                </h3>
                <p className="text-[#697485] mb-6" style={{ fontSize: '16px', fontWeight: 330, lineHeight: '24px' }}>
                  {doc.description}
                </p>
                <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.6px] uppercase" style={{ color: 'rgba(0,0,0,0.65)', fontWeight: 400 }}>
                  <span>{doc.readTime}</span>
                  <span>·</span>
                  <span>{doc.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
