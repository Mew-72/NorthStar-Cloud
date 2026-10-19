import { useEffect, useRef, useState } from 'react'
import ActionButton from './ActionButton'

const HERO_TAGLINE = 'OPERATIONS WITHOUT CHAOS'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const HEADLINE_WORDS = ['Run', 'every', 'team', 'from', 'one', 'command', 'center']

export default function Hero() {
  const [heroTagline, setHeroTagline] = useState(HERO_TAGLINE)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const stageRef = useRef(null)
  const scrambleFrameTimerRef = useRef(null)
  const scrambleLoopTimerRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const runScramble = () => {
      let frame = 0
      if (scrambleFrameTimerRef.current) clearInterval(scrambleFrameTimerRef.current)
      scrambleFrameTimerRef.current = setInterval(() => {
        frame += 1
        setHeroTagline(
          HERO_TAGLINE.split('')
            .map((char, idx) => {
              if (char === ' ') return ' '
              if (idx < frame - 1) return char
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            })
            .join(''),
        )
        if (frame > HERO_TAGLINE.length + 3) {
          clearInterval(scrambleFrameTimerRef.current)
          scrambleFrameTimerRef.current = null
          setHeroTagline(HERO_TAGLINE)
        }
      }, 55)
    }

    runScramble()
    scrambleLoopTimerRef.current = setInterval(runScramble, 6000)
    return () => {
      if (scrambleFrameTimerRef.current) clearInterval(scrambleFrameTimerRef.current)
      if (scrambleLoopTimerRef.current) clearInterval(scrambleLoopTimerRef.current)
    }
  }, [])

  const handleMouseMove = (e) => {
    const node = stageRef.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = node.getBoundingClientRect()
    setParallax({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 })

  return (
    <section className="relative overflow-hidden border-b border-black/10 bg-[#F5F1E7]">
      <div className="grid w-full lg:min-h-[calc(100vh-76px)] lg:grid-cols-[1.02fr_.98fr]">
        <div className="relative flex flex-col justify-center overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[.08]" style={{
            backgroundImage: 'linear-gradient(to right, #181817 1px, transparent 1px), linear-gradient(to bottom, #181817 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage: 'linear-gradient(135deg, black, transparent 78%)',
          }} />
          <span aria-hidden="true" className="acme-float-slow pointer-events-none absolute -left-7 top-20 h-16 w-16 rounded-full bg-[#F1BB36]" />
          <span aria-hidden="true" className="acme-float-fast pointer-events-none absolute right-8 top-24 h-7 w-7 rotate-45 bg-[#F35D68]" />

          <div className="relative z-10 max-w-2xl">
            <p className="mb-7 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[#59574f] sm:text-[11px]">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[#F35D68] acme-ping" />
                <span className="relative h-2 w-2 rounded-full bg-[#F35D68]" />
              </span>
              <span className="acme-tagline-fixed">{heroTagline}</span>
              <span className="hidden text-black/30 sm:inline">/ 01</span>
            </p>

            <h1 className="max-w-3xl text-[clamp(3.6rem,7.4vw,7.6rem)] font-bold uppercase leading-[.82] tracking-[-.085em]">
              {HEADLINE_WORDS.map((word, idx) => (
                <span key={word} className={`mr-[.16em] inline-block transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-5 opacity-0 blur-sm'} `} style={{ transitionDelay: `${100 + idx * 75}ms` }}>
                  {word === 'command' ? (
                    <span className="relative inline-block">
                      <span className="relative z-10">{word}</span>
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-[.04em] -z-0 h-[.16em] -rotate-1 bg-[#F1BB36]" />
                    </span>
                  ) : word}
                </span>
              ))}
            </h1>

            <div className="mt-8 flex max-w-xl items-start gap-4 sm:mt-10">
              <span className="mt-2 h-10 w-[3px] shrink-0 bg-[#F35D68]" />
              <p className={`max-w-md text-base leading-relaxed text-[#626057] transition-all duration-700 sm:text-lg ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}`} style={{ transitionDelay: '620ms' }}>
                A calmer command center for planning, execution, and reporting. Get the whole operation moving in the same direction.
              </p>
            </div>

            <div className={`mt-8 flex flex-col gap-3 transition-all duration-700 sm:flex-row sm:items-center ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`} style={{ transitionDelay: '740ms' }}>
              <ActionButton variant="primary" className="justify-center px-6 py-3.5 text-xs">
                Start free trial <span aria-hidden="true" className="text-base">↗</span>
              </ActionButton>
              <ActionButton variant="outline" className="justify-center px-6 py-3.5 text-xs">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[9px]">▶</span>
                Watch the overview
              </ActionButton>
            </div>

            <div className={`mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-black/10 pt-5 transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`} style={{ transitionDelay: '860ms' }}>
              <div className="flex -space-x-2">
                <span className="h-8 w-8 rounded-full border-2 border-[#F5F1E7] bg-[#F35D68]" />
                <span className="h-8 w-8 rounded-full border-2 border-[#F5F1E7] bg-[#52C6BF]" />
                <span className="h-8 w-8 rounded-full border-2 border-[#F5F1E7] bg-[#F1BB36]" />
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F5F1E7] bg-[#181817] text-[9px] font-semibold text-white">+9k</span>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#77756E]">Built for teams that keep things moving</p>
              <span className="hidden text-[#b6b1a6] sm:inline">✳</span>
              <span className="font-mono text-[10px] text-[#77756E]">01 — 04 / NORTHSTAR</span>
            </div>
          </div>

          <div className="absolute bottom-7 left-5 hidden items-center gap-3 sm:left-8 lg:flex xl:left-12">
            <span className="font-mono text-[9px] uppercase tracking-[.2em] text-[#77756E]">Scroll to explore</span>
            <span className="relative inline-block h-8 w-px overflow-hidden bg-black/15">
              <span className="absolute left-0 top-0 h-1/2 w-full bg-[#F35D68] acme-scroll-line" />
            </span>
          </div>
        </div>

        <div ref={stageRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative min-h-[34rem] overflow-hidden border-t border-black/10 bg-[#52C6BF] lg:min-h-0 lg:border-l lg:border-t-0">
          <div aria-hidden="true" className="absolute inset-0 opacity-30 acme-grid-drift" style={{ backgroundImage: 'radial-gradient(circle, rgba(24,24,23,.8) 1px, transparent 1.3px)', backgroundSize: '19px 19px' }} />
          <div aria-hidden="true" className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#F5F1E7]" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-[#F35D68]" />

          <div className="absolute left-6 top-6 z-20 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.18em] text-[#181817] sm:left-8 sm:top-8">
            <span className="h-2 w-2 rounded-full bg-[#F35D68]" /> Northstar / workspace preview
          </div>
          <div className="absolute right-6 top-6 z-20 font-mono text-[9px] text-black/60 sm:right-8 sm:top-8">FIG. 001 — LIVE SYSTEM</div>

          <div className="absolute left-1/2 top-1/2 h-[min(72vw,440px)] w-[min(72vw,440px)] -translate-x-1/2 -translate-y-1/2 sm:h-[430px] sm:w-[430px]">
            <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] border border-[#181817]/50" style={{ transform: `translate(calc(-50% + ${parallax.x * 24}px), calc(-50% + ${parallax.y * 24}px)) rotate(45deg)`, transition: 'transform .7s cubic-bezier(.22,1,.36,1)' }} />
            <div className="absolute left-1/2 top-1/2 h-[64%] w-[64%] rounded-full border border-[#181817]/60" style={{ transform: `translate(calc(-50% + ${parallax.x * -28}px), calc(-50% + ${parallax.y * -24}px))`, transition: 'transform .8s cubic-bezier(.22,1,.36,1)' }} />
            <div className="absolute left-1/2 top-1/2 h-[52%] w-[52%] bg-[#F35D68]" style={{ transform: `translate(calc(-50% + ${parallax.x * 34}px), calc(-50% + ${parallax.y * 34}px)) rotate(45deg)`, transition: 'transform .6s cubic-bezier(.22,1,.36,1)' }} />
            <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] rounded-full bg-[#F1BB36]" style={{ transform: `translate(calc(-50% + ${parallax.x * -42}px), calc(-50% + ${parallax.y * -34}px))`, transition: 'transform .7s cubic-bezier(.22,1,.36,1)' }} />
            <div className="absolute left-[55%] top-[49%] flex h-[27%] w-[27%] items-center justify-center border border-[#181817] bg-[#F5F1E7]" style={{ transform: `translate(calc(-50% + ${parallax.x * 52}px), calc(-50% + ${parallax.y * 44}px))`, transition: 'transform .7s cubic-bezier(.22,1,.36,1)' }}>
              <div className="h-0 w-0 border-b-[24px] border-l-[14px] border-r-[14px] border-b-[#181817] border-l-transparent border-r-transparent" />
            </div>
          </div>

          <div className="acme-card-float-1 absolute left-5 top-[22%] z-20 w-40 border border-black/10 bg-[#F5F1E7] p-4 shadow-[0_12px_34px_rgba(24,24,23,.12)] sm:left-8 sm:w-48">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-[.12em] text-[#77756E]">Sprint 014</p>
              <span className="h-2 w-2 rounded-full bg-[#52C6BF]" />
            </div>
            <p className="mt-3 font-['Space_Grotesk'] text-2xl font-semibold tracking-[-.06em]">On track<span className="text-[#F35D68]">.</span></p>
            <div className="mt-3 h-1.5 rounded-full bg-black/10"><div className="acme-bar-fill h-full rounded-full bg-[#F35D68]" /></div>
            <p className="mt-2 text-[9px] uppercase tracking-[.13em] text-[#77756E]">75% of milestones cleared</p>
          </div>

          <div className="acme-card-float-2 absolute bottom-[18%] right-5 z-20 w-40 border border-black/10 bg-[#F5F1E7] p-4 shadow-[0_12px_34px_rgba(24,24,23,.12)] sm:right-8 sm:w-48">
            <p className="font-mono text-[9px] uppercase tracking-[.12em] text-[#77756E]">System health</p>
            <p className="mt-2 font-['Space_Grotesk'] text-3xl font-semibold tracking-[-.07em]">99.95<span className="text-base">%</span></p>
            <div className="mt-3 flex items-end gap-1">
              {[35, 58, 46, 70, 54, 82, 66, 90, 74, 100, 80, 94].map((height, i) => <span key={i} className="flex-1 rounded-t-sm bg-[#52C6BF]" style={{ height: `${height * .28}px`, opacity: .45 + i * .045 }} />)}
            </div>
          </div>

          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[.16em] text-black/70 sm:bottom-8 sm:left-8">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/20 text-sm">↗</span>
            <span>Clarity in every direction</span>
          </div>
          <div className="absolute bottom-6 right-6 z-20 font-mono text-[9px] text-black/60 sm:bottom-8 sm:right-8">12.04 / NSC</div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-black/10 bg-[#181817] text-[#F5F1E7]">
        <div className="acme-marquee flex gap-10 whitespace-nowrap py-4 text-[10px] font-medium uppercase tracking-[.18em] sm:gap-14">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-10 sm:gap-14">
              {['Sprint planning', 'Live workflows', 'Cross-functional ops', 'Audit-ready logs', 'Realtime telemetry', 'Global rollout', 'Clear ownership', 'Incident playbooks'].map((label) => (
                <span key={`${dup}-${label}`} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#F1BB36]" />{label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
