import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-[#e5e5e5]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="no-underline">
          <span className="text-[18px] text-black tracking-[-0.18px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 520 }}>
            Tech Docs
          </span>
        </Link>
        <span className="font-mono text-[12px] tracking-[0.6px] uppercase text-[#697485]" style={{ fontWeight: 400 }}>
          v2
        </span>
      </div>
    </header>
  )
}
