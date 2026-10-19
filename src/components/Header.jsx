import { useEffect, useState } from 'react'
import ActionButton from './ActionButton'

const navLinks = ['Product', 'Features', 'Pricing', 'FAQ']

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(1, y / h) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b border-black/10 transition-all duration-300 ${scrolled ? 'bg-[#F5F1E7]/95 shadow-[0_8px_32px_rgba(24,24,23,0.06)] backdrop-blur-xl' : 'bg-[#F5F1E7]/90 backdrop-blur-md'}`}>
      <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[padding] duration-300 sm:px-8 lg:px-12 ${scrolled ? 'py-3' : 'py-5'}`}>
        <a href="#top" className="group flex items-center gap-3" aria-label="Northstar home">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#F35D68] transition-transform duration-300 group-hover:scale-125" />
            <span className="h-3 w-3 bg-[#181817] transition-transform duration-300 group-hover:rotate-45" />
            <span className="h-3 w-3 bg-[#F1BB36] transition-transform duration-300 group-hover:scale-125" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          </div>
          <div>
            <p className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-[0.16em] text-[#181817]">Northstar</p>
            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#77756E]">Operations cloud</p>
          </div>
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="group relative px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5f5d56] transition-colors duration-200 hover:text-[#181817]">
              {link}
              <span aria-hidden="true" className="absolute bottom-0 left-3 right-3 h-px origin-left scale-x-0 bg-[#F35D68] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ActionButton variant="outline" className="border-0 px-3 py-2 text-[10px] shadow-none hover:bg-black/5 hover:text-black">Log in</ActionButton>
          <ActionButton variant="primary" className="rounded-full px-5 py-3 text-[10px] shadow-none hover:shadow-[0_8px_20px_rgba(243,93,104,.22)]">Start free trial <span aria-hidden="true">↗</span></ActionButton>
        </div>

        <button type="button" className="relative h-10 w-10 rounded-full border border-black/15 bg-white/60 md:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
          <span aria-hidden="true" className={`absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 bg-black transition-all duration-300 ${mobileOpen ? 'rotate-45' : '-translate-y-[4px]'}`} />
          <span aria-hidden="true" className={`absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 bg-black transition-all duration-200 ${mobileOpen ? 'opacity-0' : 'translate-y-[4px]'}`} />
        </button>
      </div>

      <div className={`overflow-hidden border-t border-black/10 bg-[#F5F1E7] transition-[max-height,opacity] duration-300 md:hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, idx) => (
              <a key={link} href={`#${link.toLowerCase()}`} className={`border-b border-black/10 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} style={{ transitionDelay: `${mobileOpen ? 60 + idx * 40 : 0}ms` }} onClick={() => setMobileOpen(false)}>
                <span className="mr-4 font-mono text-[#F35D68]">0{idx + 1}</span>{link}
              </a>
            ))}
            <div className="flex gap-3 pt-4">
              <ActionButton variant="outline" className="flex-1 rounded-full px-4 py-3 text-[10px] shadow-none">Log in</ActionButton>
              <ActionButton variant="primary" className="flex-1 rounded-full px-4 py-3 text-[10px] shadow-none">Start free trial</ActionButton>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-black/5">
        <div className="h-full bg-[#F35D68] transition-[width] duration-150 ease-out" style={{ width: `${progress * 100}%` }} />
      </div>
    </header>
  )
}
