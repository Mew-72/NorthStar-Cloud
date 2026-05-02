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
    <header
      className={`sticky top-0 z-50 border-b-4 border-black transition-all duration-300 ease-out ${
        scrolled ? 'bg-white/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl' : 'bg-white/95 backdrop-blur-md'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-[padding] duration-300 ease-out sm:px-6 lg:px-8 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        <a href="#top" className="group flex items-center gap-3">
          <div className="flex items-center gap-1.5 acme-logo-mark">
            <span className="acme-logo-dot h-3 w-3 rounded-full bg-[#D02020] border border-black transition-transform duration-300 group-hover:scale-125" />
            <span className="acme-logo-square h-3 w-3 rounded-none bg-[#1040C0] border border-black transition-transform duration-300 group-hover:rotate-45" />
            <span
              className="acme-logo-tri h-3 w-3 bg-[#F0C020] border border-black transition-transform duration-300 group-hover:scale-125"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#111]">Northstar</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#888]">Operations cloud</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="acme-nav-link group relative px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#111] transition-colors duration-200 hover:text-[#D02020]"
            >
              <span className="relative z-10">{link}</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1 left-1/2 h-[3px] w-0 -translate-x-1/2 bg-[#D02020] transition-all duration-300 ease-out group-hover:w-[60%]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-0 origin-bottom scale-y-0 bg-[#F0C020]/40 transition-transform duration-300 ease-out group-hover:scale-y-100"
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ActionButton variant="outline" className="px-4 py-2 text-xs shadow-[3px_3px_0px_0px_black]">
            Log in
          </ActionButton>
          <ActionButton variant="primary" className="px-4 py-2 text-xs shadow-[3px_3px_0px_0px_black]">
            Start free trial
          </ActionButton>
        </div>

        <button
          type="button"
          className="relative h-10 w-10 border-2 border-black bg-white shadow-[3px_3px_0px_0px_black] md:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 block h-[3px] w-5 -translate-x-1/2 bg-black transition-all duration-300 ${
              mobileOpen ? 'rotate-45' : '-translate-y-[6px]'
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 block h-[3px] w-5 -translate-x-1/2 bg-black transition-all duration-200 ${
              mobileOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            aria-hidden="true"
            className={`absolute left-1/2 top-1/2 block h-[3px] w-5 -translate-x-1/2 bg-black transition-all duration-300 ${
              mobileOpen ? '-rotate-45' : 'translate-y-[6px]'
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-t-4 border-black bg-white transition-[max-height,opacity] duration-500 ease-out md:hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, idx) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`border-b border-black/10 py-3 text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 ease-out ${
                  mobileOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: `${mobileOpen ? 80 + idx * 60 : 0}ms` }}
                onClick={() => setMobileOpen(false)}
              >
                <span className="inline-block w-6 text-[#D02020]">0{idx + 1}</span>
                {link}
              </a>
            ))}
            <div className="flex gap-3 pt-4">
              <ActionButton variant="outline" className="flex-1 px-4 py-2 text-xs">
                Log in
              </ActionButton>
              <ActionButton variant="primary" className="flex-1 px-4 py-2 text-xs">
                Start free trial
              </ActionButton>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden">
        <div
          className="h-full bg-[#D02020] transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  )
}
