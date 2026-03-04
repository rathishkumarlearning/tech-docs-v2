import { Doc } from '../docs'

interface Props {
  doc: Doc
  activeSection: number
  onSectionClick: (id: number) => void
}

export default function Sidebar({ doc, activeSection, onSectionClick }: Props) {
  return (
    <aside className="w-[280px] shrink-0 sticky top-6 self-start hidden lg:block">
      <div className="pr-8">
        <span className="font-mono text-[11px] tracking-[0.48px] uppercase text-[#697485] block mb-4">
          Sections
        </span>
        <nav className="flex flex-col gap-1">
          {doc.sections.map(s => (
            <button
              key={s.id}
              onClick={() => onSectionClick(s.id)}
              className={`flex items-center gap-3 text-left px-3 py-2.5 rounded-lg transition-all text-[14px] ${
                activeSection === s.id
                  ? 'text-black font-medium bg-[#f5f5f0]'
                  : 'text-[#697485] hover:text-black hover:bg-[#fafafa]'
              }`}
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                activeSection === s.id ? 'bg-[#a259ff]' : 'bg-transparent'
              }`} />
              <span className="leading-snug">{s.title}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
