import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { getDoc } from '../docs'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Reader() {
  const { slug } = useParams<{ slug: string }>()
  const doc = getDoc(slug || '')
  const [activeSection, setActiveSection] = useState(1)
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-section-id'))
            if (id) setActiveSection(id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [doc])

  const scrollToSection = (id: number) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!doc) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[24px] font-medium text-black mb-4">Doc not found</h1>
          <Link to="/" className="text-[#a259ff] underline">Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="font-mono text-[12px] tracking-[0.48px] uppercase text-[#697485] hover:text-black transition-colors no-underline inline-block mb-12">
          ← Back
        </Link>

        <div className="mb-16">
          <span className="font-mono text-[12px] tracking-[0.48px] uppercase text-[#697485] block mb-4">
            {doc.category}
          </span>
          <h1 className="text-[42px] font-medium tracking-[-1px] text-black mb-6 leading-tight max-w-3xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {doc.title}
          </h1>
          <p className="text-[18px] text-[#697485] max-w-2xl mb-6" style={{ fontWeight: 350, lineHeight: 1.6 }}>
            {doc.description}
          </p>
          <div className="flex items-center gap-4 font-mono text-[12px] text-[#697485] tracking-[0.3px]">
            <span>{doc.author}</span>
            <span>·</span>
            <span>{doc.date}</span>
            <span>·</span>
            <span>{doc.readTime}</span>
          </div>
        </div>

        <div className="flex gap-12">
          <Sidebar doc={doc} activeSection={activeSection} onSectionClick={scrollToSection} />
          
          <article className="min-w-0 max-w-[740px] flex-1">
            {doc.sections.map((section, i) => (
              <div key={section.id}>
                <div
                  ref={el => { sectionRefs.current[section.id] = el }}
                  data-section-id={section.id}
                  className="scroll-mt-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-[11px] tracking-[0.48px] text-[#697485]">
                      {String(section.id).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[11px] text-[#697485]">·</span>
                    <span className="font-mono text-[11px] tracking-[0.3px] text-[#697485]">
                      {section.duration}
                    </span>
                  </div>
                  <div
                    className="reader-content"
                    dangerouslySetInnerHTML={{ __html: `<h2>${section.title}</h2>${section.content}` }}
                  />
                </div>
                {i < doc.sections.length - 1 && (
                  <hr className="border-0 border-t border-[#e5e5e5] my-16" />
                )}
              </div>
            ))}
          </article>
        </div>
      </div>
    </div>
  )
}
