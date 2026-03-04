import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { docs } from '../docs'
import Header from './Header'

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(docs.map(d => d.category))
    return Array.from(cats)
  }, [])

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
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h1 className="text-[36px] font-medium tracking-[-0.72px] text-black mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Tech Docs
          </h1>
          <p className="font-mono text-[13px] tracking-[0.48px] uppercase text-[#697485]">
            Curated Technical Knowledge
          </p>
        </div>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search docs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-5 py-3 text-[16px] rounded-xl border border-[#e5e5e5] outline-none focus:border-[#a259ff] transition-colors bg-white"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          />
        </div>

        <div className="flex gap-2 mb-12 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`font-mono text-[12px] tracking-[0.48px] uppercase px-4 py-2 rounded-full border transition-all ${
              !activeCategory ? 'bg-black text-white border-black' : 'bg-white text-[#697485] border-[#e5e5e5] hover:border-[#697485]'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`font-mono text-[12px] tracking-[0.48px] uppercase px-4 py-2 rounded-full border transition-all ${
                activeCategory === cat ? 'bg-black text-white border-black' : 'bg-white text-[#697485] border-[#e5e5e5] hover:border-[#697485]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doc => (
            <Link
              key={doc.slug}
              to={`/doc/${doc.slug}`}
              className="no-underline group"
            >
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <span className="font-mono text-[11px] tracking-[0.48px] uppercase text-[#697485] block mb-4">
                  {doc.category}
                </span>
                <h3 className="text-[20px] font-semibold tracking-[-0.24px] text-black mb-3 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {doc.title}
                </h3>
                <p className="text-[15px] text-[#697485] leading-relaxed mb-6" style={{ fontWeight: 350 }}>
                  {doc.description}
                </p>
                <div className="flex items-center gap-3 font-mono text-[11px] text-[#697485] tracking-[0.3px]">
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
