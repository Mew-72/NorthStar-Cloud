import { useEffect, useRef, useState } from 'react'

const navLinks = ['Product', 'Features', 'Pricing', 'FAQ']

const sponsorCards = [
  {
    title: 'Northstar Labs',
    label: 'Launch partner',
    description: 'Prototype quickly, ship confidently.',
    accent: 'bg-[#D02020]',
    ring: 'ring-[#121212]',
  },
  {
    title: 'Helio Metrics',
    label: 'Technology partner',
    description: 'Forecasting and reporting for high-growth teams.',
    accent: 'bg-[#1040C0]',
    ring: 'ring-[#1040C0]',
  },
]

const insights = [
  {
    tag: 'Ops',
    title: 'A control room mindset for modern operations.',
    blurb: 'Bring planning, execution, and delivery timelines into one readable surface.',
  },
  {
    tag: 'Workflow',
    title: 'Automations that remove repetitive handoffs.',
    blurb: 'Route approvals and updates to the right people without slowing momentum.',
  },
  {
    tag: 'Growth',
    title: 'Structure that scales from ten people to ten regions.',
    blurb: 'Keep standards high while teams expand across products and time zones.',
  },
]

const featureCards = [
  'Live squad workspaces',
  'Rule-based automations',
  'Executive reporting',
  'Connected data hubs',
  'Role-based governance',
  'Regional failover',
]

const steps = [
  {
    title: 'Map your operation',
    text: 'Turn recurring work into clear, trackable workflows.',
  },
  {
    title: 'Automate decision points',
    text: 'Set rules, handoffs, and alerts for every critical transition.',
  },
  {
    title: 'Ship with confidence',
    text: 'Launch repeatable playbooks your teams can trust every week.',
  },
]

const footerColumns = [
  {
    title: 'Product',
    links: ['Overview', 'Features', 'Pricing'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Docs', 'Blog', 'Support'],
  },
]

const reasons = [
  {
    title: 'One source of truth',
    text: 'Plans, risks, and progress stay visible across every function.',
  },
  {
    title: 'Faster execution',
    text: 'Teams move from request to delivery with fewer blockers.',
  },
  {
    title: 'Reliable scale',
    text: 'Operations stay stable as headcount, products, and regions grow.',
  },
  {
    title: 'Clear accountability',
    text: 'Ownership and next steps are explicit in every workflow stage.',
  },
]

const testimonials = [
  {
    quote: 'Northstar gave our ops team a system that finally feels intentional.',
    name: 'Rina Solberg',
    role: 'VP Operations',
  },
  {
    quote: 'We replaced four disconnected tools and immediately reduced handoff lag.',
    name: 'Javier Kim',
    role: 'Program Director',
  },
  {
    quote: 'Leadership reporting is now automatic, and our dashboards are actually trusted.',
    name: 'Maya Trinh',
    role: 'Chief of Staff',
  },
  {
    quote: 'The rollout templates made expansion to two new markets much smoother.',
    name: 'Callum Price',
    role: 'Regional GM',
  },
  {
    quote: 'Our cross-functional standups are shorter because everyone sees the same reality.',
    name: 'Leila Duarte',
    role: 'Operations Lead',
  },
  {
    quote: 'It is rare to find software that improves process and communication at once.',
    name: 'Tom Becker',
    role: 'Delivery Manager',
  },
]

const pricingPlans = [
  {
    name: 'Launch',
    price: 'USD 39',
    subtitle: 'For teams building operational discipline',
    features: ['One command center', 'Core reports', '8 integrations', 'Email support'],
    tone: 'white',
  },
  {
    name: 'Scale',
    price: 'USD 99',
    subtitle: 'For multi-team execution at speed',
    features: ['Unlimited workflows', 'Advanced analytics', '40 integrations', 'Priority support'],
    tone: 'highlight',
  },
  {
    name: 'Constellation',
    price: 'USD --',
    subtitle: 'Custom architecture for global organizations',
    features: ['SSO and controls', 'Dedicated onboarding', 'Strategic support', 'SLA and governance'],
    tone: 'white',
  },
]

const faqItems = [
  'How fast can we launch Northstar with our current stack?',
  'Can workflows be customized for each department?',
  'What integrations are available out of the box?',
  'How do permissions and approvals work?',
  'Do you support multi-region operations and compliance?',
]

const HERO_TAGLINE = 'OPERATIONS WITHOUT CHAOS'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function ActionButton({ variant = 'primary', className = '', children, ...props }) {
  const variants = {
    primary: 'bg-[#D02020] text-white hover:bg-white hover:text-[#D02020]',
    secondary: 'bg-white text-black hover:bg-black hover:text-white',
    dark: 'bg-black text-white hover:bg-white hover:text-black',
    outline: 'bg-transparent text-black border-black hover:bg-black hover:text-white',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 border-2 border-black px-5 py-3 text-sm font-black uppercase tracking-[0.2em] transition-all duration-200 ease-out shadow-[4px_4px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

function SectionHeading({ eyebrow, title, subtitle, center = false, dark = false }) {
  return (
    <div className={`${center ? 'text-center' : ''} max-w-3xl ${center ? 'mx-auto' : ''}`}>
      <p className={`text-xs font-black uppercase tracking-[0.35em] ${dark ? 'text-white/80' : 'text-[#111]'}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-4xl font-black uppercase tracking-tighter sm:text-5xl lg:text-6xl ${
          dark ? 'text-white' : 'text-[#111]'
        }`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? 'text-white/90' : 'text-[#333]'}`}>
        {subtitle}
      </p>
    </div>
  )
}

export default function AcmeApp() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [closingFaqIndex, setClosingFaqIndex] = useState(null)
  const [queuedFaqIndex, setQueuedFaqIndex] = useState(null)
  const [heroTagline, setHeroTagline] = useState(HERO_TAGLINE)
  const closeTimerRef = useRef(null)
  const queuedFaqIndexRef = useRef(null)
  const scrambleFrameTimerRef = useRef(null)
  const scrambleLoopTimerRef = useRef(null)

  const clearFaqTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const clearScrambleTimers = () => {
    if (scrambleFrameTimerRef.current) {
      clearInterval(scrambleFrameTimerRef.current)
      scrambleFrameTimerRef.current = null
    }

    if (scrambleLoopTimerRef.current) {
      clearInterval(scrambleLoopTimerRef.current)
      scrambleLoopTimerRef.current = null
    }
  }

  useEffect(() => {
    const runScramble = () => {
      let frame = 0
      if (scrambleFrameTimerRef.current) {
        clearInterval(scrambleFrameTimerRef.current)
      }

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
    scrambleLoopTimerRef.current = setInterval(runScramble, 3400)

    return () => {
      clearFaqTimer()
      clearScrambleTimers()
    }
  }, [])

  const handleFaqToggle = (index) => {
    const activeIndex = closingFaqIndex ?? openFaqIndex

    if (closingFaqIndex !== null) {
      queuedFaqIndexRef.current = index
      setQueuedFaqIndex(index)
      return
    }

    if (activeIndex === index) {
      clearFaqTimer()
      setClosingFaqIndex(index)
      setQueuedFaqIndex(null)
      setOpenFaqIndex(null)

      closeTimerRef.current = setTimeout(() => {
        setClosingFaqIndex(null)
        closeTimerRef.current = null
      }, 180)
      return
    }

    if (activeIndex !== null) {
      clearFaqTimer()
      setClosingFaqIndex(activeIndex)
      queuedFaqIndexRef.current = index
      setQueuedFaqIndex(index)
      setOpenFaqIndex(null)

      closeTimerRef.current = setTimeout(() => {
        setClosingFaqIndex(null)
        setOpenFaqIndex(queuedFaqIndexRef.current ?? index)
        setQueuedFaqIndex(null)
        queuedFaqIndexRef.current = null
        closeTimerRef.current = null
      }, 180)
      return
    }

    setOpenFaqIndex(index)
  }

  return (
    <div className="overflow-x-hidden bg-[#F3F0E6] text-[#111]">
      <header className="sticky top-0 z-50 border-b-4 border-black bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#D02020] border border-black" />
              <span className="h-3 w-3 rounded-none bg-[#1040C0] border border-black" />
              <span
                className="h-3 w-3 bg-[#F0C020] border border-black"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#444]">Northstar</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#888]">Operations cloud</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-black uppercase tracking-[0.2em] transition hover:text-[#D02020]">
                {link}
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
            className="border-2 border-black bg-white p-2 text-xl font-black shadow-[3px_3px_0px_0px_black] md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t-4 border-black bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-black uppercase tracking-[0.2em]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <ActionButton variant="outline" className="flex-1 px-4 py-2 text-xs">
                  Log in
                </ActionButton>
                <ActionButton variant="primary" className="flex-1 px-4 py-2 text-xs">
                  Start free trial
                </ActionButton>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="min-h-screen border-b-4 border-black bg-white">
          <div className="w-full grid min-h-screen lg:grid-cols-2">
            <div className="flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
              <div className="max-w-xl space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-[#D02020] acme-red-breathe min-h-[1.25rem]">
                    {heroTagline}
                  </p>
                  <h1 className="max-w-lg text-5xl font-black uppercase tracking-tighter leading-[0.88] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                    Run every team from one command center
                  </h1>
                  <p className="max-w-md border-l-4 border-[#D02020] pl-4 text-base leading-relaxed text-[#333] sm:text-lg">
                    A unified operations platform for planning, execution, and reporting.
                    Built for speed, clarity, and scale.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <ActionButton variant="primary">Start free trial</ActionButton>
                  <ActionButton variant="outline">Watch a demo</ActionButton>
                </div>

                <div className="flex items-center gap-4 pt-2 text-xs font-black uppercase tracking-[0.24em] text-[#555]">
                  <div className="flex -space-x-2">
                    <span className="h-8 w-8 rounded-full border-2 border-black bg-[#D02020] acme-dot-loader acme-dot-delay-1" />
                    <span className="h-8 w-8 rounded-full border-2 border-black bg-[#F0C020] acme-dot-loader acme-dot-delay-2" />
                    <span className="h-8 w-8 rounded-full border-2 border-black bg-[#1040C0] acme-dot-loader acme-dot-delay-3" />
                  </div>
                  <p>Trusted by 12,000+ operators and delivery teams</p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[42rem] overflow-hidden border-t-4 border-black bg-[#1040C0] lg:border-t-0 lg:border-l-4">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rotate-45 border-4 border-black bg-[#D02020] shadow-[12px_12px_0px_0px_black] acme-geo-1" />
              <div className="absolute left-1/2 top-1/2 h-36 w-36 rounded-full border-4 border-black bg-[#F0C020] shadow-[10px_10px_0px_0px_black] acme-geo-2" />
              <div className="absolute left-[56%] top-[48%] flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-4 border-black bg-white shadow-[10px_10px_0px_0px_black] acme-geo-3">
                <div
                  className="h-0 w-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[30px] border-b-black"
                  style={{ transform: 'translateY(-2px)' }}
                />
              </div>
              <div className="absolute bottom-6 right-6 rounded-full border-2 border-black bg-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-white shadow-[4px_4px_0px_0px_white]">
                Art direction
              </div>
            </div>
          </div>
        </section>

        <section className="border-b-4 border-black bg-[#F0F0F0]">
          <div className="w-full grid min-h-screen lg:grid-cols-2">
            <div className="flex min-h-[28rem] items-center justify-center border-b-4 border-black bg-[#D02020] p-10 lg:border-b-0 lg:border-r-4">
              <div className="relative h-56 w-56">
                <div className="absolute left-0 top-0 h-28 w-28 rounded-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_black]" />
                <div className="absolute right-2 top-16 h-36 w-36 rotate-45 border-4 border-black bg-[#F0C020] shadow-[10px_10px_0px_0px_black]" />
                <div className="absolute left-24 top-12 h-24 w-24 border-4 border-black bg-black shadow-[6px_6px_0px_0px_white]" />
              </div>
            </div>

            <div className="flex items-center bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
              <div className="max-w-xl space-y-6">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[#D02020]">Platform overview</p>
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-[0.95] sm:text-5xl lg:text-6xl">
                  Coordinate people, systems, and timelines in one operational layer.
                </h2>
                <p className="text-base leading-relaxed text-[#333] sm:text-lg">
                  Replace scattered status updates with structured workflows and live visibility.
                  Keep teams aligned from intake to delivery.
                </p>
                <div className="grid grid-cols-3 gap-3 pt-4 text-center text-xs font-black uppercase tracking-[0.24em] sm:gap-4">
                  <div className="border-2 border-black bg-[#F0F0F0] px-3 py-4">Plan</div>
                  <div className="border-2 border-black bg-[#F0C020] px-3 py-4">Build</div>
                  <div className="border-2 border-black bg-[#D02020] px-3 py-4 text-white">Ship</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b-4 border-black bg-[#F0C020]">
          <div className="grid w-full grid-cols-2 lg:grid-cols-4">
            {[
              ['320k+', 'Workflows run'],
              ['99.95%', 'Platform uptime'],
              ['42', 'Countries active'],
              ['$28M+', 'Revenue influenced'],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`border-b-4 border-black px-4 py-8 text-center ${index % 2 === 0 ? 'bg-[#F0C020]' : 'bg-white'} lg:border-b-0 ${index < 3 ? 'lg:border-r-4' : 'lg:border-r-0'}`}
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#D02020] text-sm font-black text-white">
                  {index + 1}
                </div>
                <div className="text-3xl font-black uppercase tracking-tighter text-[#111] sm:text-4xl">
                  {value}
                </div>
                <div className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-[#333]">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="product" className="border-b-4 border-black bg-[#F4F1E8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Partners"
              title="Trusted by operational leaders"
              subtitle="A fictional ecosystem of teams and tools built around Northstar workflows."
              center
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {sponsorCards.map((card) => (
                <article key={card.title} className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_black] sm:p-5">
                  <div className={`flex aspect-[1.1] items-center justify-center border-4 border-black ${card.ring} bg-[#111] p-5`}>
                    <div className={`h-56 w-56 rounded-full border-4 border-black bg-[#F4F1E8] ${card.ring} flex items-center justify-center overflow-hidden`}>
                      <div className="h-40 w-40 rounded-full border-4 border-black bg-gradient-to-br from-[#111] via-[#333] to-[#D02020]" />
                    </div>
                  </div>
                  <div className="space-y-4 px-2 py-5 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#666]">{card.label}</p>
                    <h3 className="text-3xl font-black uppercase tracking-tighter">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-[#444]">{card.description}</p>
                    <div className="flex justify-center">
                      <ActionButton variant="outline" className="px-4 py-2 text-xs shadow-[3px_3px_0px_0px_black]">
                        Learn more
                      </ActionButton>
                    </div>
                    <div className="mx-auto h-2 w-24 bg-[#111]" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="border-b-4 border-black bg-[#1040C0] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Operational insights"
              title="Latest briefings from northstar journal"
              subtitle="Field notes, process ideas, and execution patterns from growing teams."
              dark
              center
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {insights.map((post, index) => (
                <article key={post.title} className="overflow-hidden border-4 border-black bg-white text-[#111] shadow-[8px_8px_0px_0px_black] hover:translate-y-[-4px] transition-transform">
                  <div className={`h-40 border-b-4 border-black ${index === 1 ? 'bg-[#111]' : index === 2 ? 'bg-[#F0C020]' : 'bg-[#D02020]'}`}>
                    <div className="flex h-full items-center justify-center text-6xl font-black text-white">{index + 1}</div>
                  </div>
                  <div className="space-y-3 p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#D02020]">{post.tag}</p>
                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">{post.title}</h3>
                    <p className="text-sm leading-relaxed text-[#444]">{post.blurb}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-[#111]">
                      Read more <span>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b-4 border-black bg-[#F4F1E8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Capabilities"
              title="A simple, transparent feature grid"
              subtitle="Small cards, strong borders, and one clear idea per tile."
              center
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature, index) => (
                <article key={feature} className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_black] hover:translate-y-[-4px] transition-transform">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-4">
                      <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#F4F1E8] font-black">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tight">{feature}</h3>
                    </div>
                    <div className={`h-3 w-3 border border-black ${index % 3 === 0 ? 'bg-[#D02020]' : index % 3 === 1 ? 'bg-[#1040C0]' : 'bg-[#F0C020]'}`} />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#444]">
                    Thoughtful spacing and contrast keep the card easy to scan even as the list grows.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="border-b-4 border-black bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Process"
              title="How northstar works"
              subtitle="Three practical steps from setup to high-velocity execution."
              center
            />

            <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-10">
              {steps.map((step, index) => (
                <article key={step.title} className="relative border-4 border-black bg-[#F4F1E8] p-6 shadow-[8px_8px_0px_0px_black]">
                  <div className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center border-4 border-black bg-white text-xl font-black">
                    {index + 1}
                  </div>
                  <div className="pt-6 text-center">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">{step.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#444]">{step.text}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full h-1 w-12 bg-black" />
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b-4 border-black bg-[#D02020] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Value"
                title="Why teams choose northstar"
                subtitle="A focused set of benefits that explains the value without adding clutter."
                dark
              />
              <p className="max-w-sm text-xs font-black uppercase tracking-[0.3em] text-white/80">
                A visual system built for confidence and momentum.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason) => (
                <article key={reason.title} className="border-4 border-black bg-white p-5 text-[#111] shadow-[6px_6px_0px_0px_black]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-[#F0C020] text-sm font-black">✓</div>
                    <h3 className="text-lg font-black uppercase tracking-tighter">{reason.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#444]">{reason.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b-4 border-black bg-[#F3F0E6] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Social proof"
              title="Trusted by high-output operators"
              subtitle="Feedback from fictional leaders running complex programs at scale."
              center
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <article key={item.name} className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_black]">
                  <div className="mb-4 flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-full border-2 border-black ${index % 2 === 0 ? 'bg-[#D02020]' : 'bg-[#1040C0]'}`} />
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight">{item.name}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#666]">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#333]">“{item.quote}”</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-b-4 border-black bg-[#F4F1E8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Pricing"
              title="Flexible pricing for every stage"
              subtitle="Three plans tuned for launch teams, scaling orgs, and global operations."
              center
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`border-4 border-black p-6 shadow-[8px_8px_0px_0px_black] ${
                    plan.tone === 'highlight' ? 'bg-[#F0C020]' : 'bg-white'
                  } ${plan.tone === 'highlight' ? 'lg:min-h-[40rem] lg:-translate-y-4' : 'lg:min-h-[34rem]'} flex flex-col`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#666]">Plan</p>
                  <h3 className="mt-2 text-3xl font-black uppercase tracking-tighter">{plan.name}</h3>
                  <div className="mt-4 border-y-4 border-black py-4">
                    <div className="text-4xl font-black uppercase tracking-tighter">{plan.price}</div>
                    <div className="mt-1 text-xs font-black uppercase tracking-[0.3em] text-[#444]">{plan.subtitle}</div>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#222] flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1 inline-block h-2.5 w-2.5 border border-black bg-[#D02020]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <ActionButton variant={plan.tone === 'highlight' ? 'primary' : 'outline'} className="w-full text-xs">
                      {plan.name === 'Constellation' ? 'Contact sales' : 'Start free trial'}
                    </ActionButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="border-b-4 border-black bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="Support"
              title="Frequently asked questions"
              subtitle="Common questions teams ask before rolling out Northstar across departments."
              center
            />

            <div className="mt-10 space-y-4">
              {faqItems.map((item, index) => (
                <article
                  key={item}
                  className={`border-4 border-black bg-[#F4F1E8] shadow-[6px_6px_0px_0px_black] transition-all duration-150 ease-out ${
                    closingFaqIndex === index ? 'translate-y-[-2px] scale-[0.995]' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleFaqToggle(index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-black uppercase tracking-[0.2em]"
                    aria-expanded={openFaqIndex === index}
                  >
                    <span>{item}</span>
                    <span className={`transition-transform duration-150 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden border-t-4 border-black px-5 text-sm leading-relaxed text-[#444] transition-all duration-200 ease-out ${
                      openFaqIndex === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                    }`}
                  >
                    Northstar can be configured gradually. Most teams start with one workflow, validate adoption, then scale to additional regions and functions.
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b-4 border-black bg-[#F0C020] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="absolute -left-10 bottom-0 h-36 w-36 rounded-full border-4 border-black bg-[#D02020] opacity-90" />
          <div className="absolute right-0 top-0 h-36 w-36 border-l-4 border-b-4 border-black bg-[#7A7664]" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />

          <div className="relative mx-auto max-w-5xl text-center">
            <SectionHeading
              eyebrow="Final call to action"
              title="Ready to transform your workflow?"
              subtitle="Bring planning, execution, and reporting into one bold operational surface."
              center
            />
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <ActionButton variant="primary">Start free trial</ActionButton>
              <ActionButton variant="secondary">Schedule a demo</ActionButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#111] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#D02020]" />
                <span className="h-3 w-3 rounded-none bg-[#1040C0]" />
                <span className="h-3 w-3 bg-[#F0C020]" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/80">
                Northstar is a fictional operations platform for fast-moving teams that need clarity,
                accountability, and execution at scale.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-black uppercase tracking-[0.35em] text-[#F0C020]">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {column.links.map((item) => (
                    <li key={item}>
                      <a href="#" className="transition hover:text-[#F0C020]">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-white/15 pt-6 text-xs uppercase tracking-[0.28em] text-white/60">
            2026 Northstar Systems. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}