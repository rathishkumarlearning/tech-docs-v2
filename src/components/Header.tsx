import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-[#e5e5e5]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="no-underline">
          <h1 className="text-[24px] font-medium tracking-[-0.5px] text-black" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Tech Docs
          </h1>
        </Link>
        <span className="font-mono text-[12px] tracking-[0.48px] uppercase text-[#697485]">
          v2
        </span>
      </div>
    </header>
  )
}
