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
    scrambleLoopTimerRef.current = setInterval(runScramble, 4000)

    return () => {
      if (scrambleFrameTimerRef.current) clearInterval(scrambleFrameTimerRef.current)
      if (scrambleLoopTimerRef.current) clearInterval(scrambleLoopTimerRef.current)
    }
  }, [])

  const handleMouseMove = (e) => {
    const node = stageRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setParallax({ x, y })
  }

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 })

  return (
    <section className="relative min-h-screen overflow-hidden border-b-4 border-black bg-white">
      <div className="grid w-full lg:min-h-[calc(100vh-72px)] lg:grid-cols-[1.05fr_1fr]">
        {/* Left: Content */}
        <div className="relative flex flex-col justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          {/* Animated grid backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)',
            }}
          />

          {/* Floating accent shapes */}
          <span
            aria-hidden="true"
            className="acme-float-slow pointer-events-none absolute -left-6 top-16 h-16 w-16 rotate-12 border-4 border-black bg-[#F0C020] shadow-[6px_6px_0px_0px_black]"
          />
          <span
            aria-hidden="true"
            className="acme-float-fast pointer-events-none absolute right-10 top-24 h-10 w-10 rounded-full border-4 border-black bg-[#1040C0]"
          />

          <div className="relative max-w-xl space-y-8">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-3 border-2 border-black bg-[#F4F1E8] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.35em] text-[#111] shadow-[3px_3px_0px_0px_black]">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[#D02020] acme-ping" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-[#D02020]" />
                </span>
                <span className="acme-tagline-fixed">{heroTagline}</span>
              </p>

              <h1 className="max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-tighter sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
                {HEADLINE_WORDS.map((word, idx) => (
                  <span
                    key={`${word}-${idx}`}
                    className={`mr-3 inline-block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      mounted ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-6 opacity-0 blur-sm'
                    } ${word === 'command' ? 'relative' : ''}`}
                    style={{ transitionDelay: `${120 + idx * 80}ms` }}
                  >
                    {word === 'command' ? (
                      <span className="relative inline-block">
                        <span className="relative z-10">{word}</span>
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-[#F0C020]"
                        />
                      </span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </h1>

              <p
                className={`max-w-md border-l-4 border-[#D02020] pl-4 text-base leading-relaxed text-[#333] transition-all duration-700 ease-out sm:text-lg ${
                  mounted ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                A unified operations platform for planning, execution, and reporting.
                Built for speed, clarity, and scale.
              </p>
            </div>

            <div
              className={`flex flex-col gap-4 transition-all duration-700 ease-out sm:flex-row ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '820ms' }}
            >
              <ActionButton variant="primary">
                Start free trial
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </ActionButton>
              <ActionButton variant="outline">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[#D02020] acme-ping" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-[#D02020]" />
                </span>
                Watch a demo
              </ActionButton>
            </div>

            <div
              className={`flex items-center gap-4 pt-2 text-xs font-black uppercase tracking-[0.24em] text-[#555] transition-all duration-700 ease-out ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '940ms' }}
            >
              <div className="flex -space-x-2">
                <span className="h-9 w-9 rounded-full border-2 border-black bg-[#D02020] acme-dot-loader acme-dot-delay-1" />
                <span className="h-9 w-9 rounded-full border-2 border-black bg-[#F0C020] acme-dot-loader acme-dot-delay-2" />
                <span className="h-9 w-9 rounded-full border-2 border-black bg-[#1040C0] acme-dot-loader acme-dot-delay-3" />
                <span className="h-9 w-9 rounded-full border-2 border-black bg-black text-[10px] flex items-center justify-center text-white acme-dot-loader acme-dot-delay-4">+9k</span>
              </div>
              <p>Trusted by 12,000+ operators and delivery teams</p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-4 hidden items-center gap-3 sm:left-6 lg:flex lg:left-10">
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#666]">Scroll</span>
            <span className="relative inline-block h-10 w-[2px] overflow-hidden bg-black/15">
              <span className="absolute left-0 top-0 h-1/2 w-full bg-[#D02020] acme-scroll-line" />
            </span>
          </div>
        </div>

        {/* Right: Animated stage */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative min-h-[42rem] overflow-hidden border-t-4 border-black bg-[#1040C0] lg:border-t-0 lg:border-l-4"
        >
          {/* Animated radial dots */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 acme-grid-drift"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Diagonal sweep band */}
          <div
            aria-hidden="true"
            className="acme-sweep pointer-events-none absolute -left-1/3 top-1/2 h-[140%] w-[180%] -translate-y-1/2 rotate-[-18deg]"
          />

          {/* Floating geometry with parallax */}
          <div
            className="absolute left-1/2 top-1/2 h-56 w-56 border-4 border-black bg-[#D02020] shadow-[14px_14px_0px_0px_black] acme-geo-1"
            style={{
              transform: `translate(calc(-50% + ${parallax.x * 36}px), calc(-50% + ${parallax.y * 36}px)) rotate(45deg)`,
              transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-36 w-36 rounded-full border-4 border-black bg-[#F0C020] shadow-[10px_10px_0px_0px_black] acme-geo-2"
            style={{
              transform: `translate(calc(-50% + ${parallax.x * -56}px), calc(-50% + ${parallax.y * -56}px))`,
              transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
          <div
            className="absolute left-[56%] top-[48%] flex h-36 w-36 items-center justify-center border-4 border-black bg-white shadow-[10px_10px_0px_0px_black] acme-geo-3"
            style={{
              transform: `translate(calc(-50% + ${parallax.x * 80}px), calc(-50% + ${parallax.y * 60}px))`,
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div
              className="h-0 w-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[30px] border-b-black"
              style={{ transform: 'translateY(-2px)' }}
            />
          </div>

          {/* Mini cards floating */}
          <div
            className="absolute left-6 top-10 w-44 border-2 border-black bg-white p-3 shadow-[6px_6px_0px_0px_black] acme-card-float-1"
            style={{ transform: `translate(${parallax.x * 14}px, ${parallax.y * 14}px)`, transition: 'transform 0.5s ease-out' }}
          >
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D02020]">Live</p>
            <p className="mt-1 text-xs font-black uppercase tracking-tighter">Sprint 14</p>
            <div className="mt-2 h-1.5 w-full bg-black/10">
              <div className="h-full w-3/4 bg-[#1040C0] acme-bar-fill" />
            </div>
          </div>

          <div
            className="absolute bottom-20 right-8 w-44 border-2 border-black bg-white p-3 shadow-[6px_6px_0px_0px_black] acme-card-float-2"
            style={{ transform: `translate(${parallax.x * -16}px, ${parallax.y * -10}px)`, transition: 'transform 0.5s ease-out' }}
          >
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1040C0]">Uptime</p>
            <p className="mt-1 text-xl font-black tracking-tighter">99.95%</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#666]">Last 90 days</p>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border-2 border-black bg-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-white shadow-[4px_4px_0px_0px_white]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F0C020] acme-pulse" />
            Live preview
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative border-t-4 border-black bg-black text-white">
        <div className="acme-marquee flex gap-12 whitespace-nowrap py-3 text-xs font-black uppercase tracking-[0.35em]">
          {Array.from({ length: 2 }).map((_, dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-12">
              {[
                'Sprint planning',
                'Live workflows',
                'Cross-functional ops',
                'Audit-ready logs',
                'Realtime telemetry',
                'Global rollout',
                'Permissioned governance',
                'Incident playbooks',
              ].map((label) => (
                <span key={`${dup}-${label}`} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#F0C020]" />
                  {label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
