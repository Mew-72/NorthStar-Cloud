import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Reveal from './components/Reveal'
import SectionHeading from './components/SectionHeading'
import ActionButton from './components/ActionButton'
import AnimatedStat from './components/AnimatedStat'

const sponsorCards = [
  {
    title: 'Northstar Labs',
    label: 'Launch partner',
    description: 'Prototype quickly, ship confidently.',
  },
  {
    title: 'Helio Metrics',
    label: 'Technology partner',
    description: 'Forecasting and reporting for high-growth teams.',
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
  { title: 'Product', links: ['Overview', 'Features', 'Pricing'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact'] },
  { title: 'Resources', links: ['Docs', 'Blog', 'Support'] },
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
  { quote: 'Northstar gave our ops team a system that finally feels intentional.', name: 'Rina Solberg', role: 'VP Operations' },
  { quote: 'We replaced four disconnected tools and immediately reduced handoff lag.', name: 'Javier Kim', role: 'Program Director' },
  { quote: 'Leadership reporting is now automatic, and our dashboards are actually trusted.', name: 'Maya Trinh', role: 'Chief of Staff' },
  { quote: 'The rollout templates made expansion to two new markets much smoother.', name: 'Callum Price', role: 'Regional GM' },
  { quote: 'Our cross-functional standups are shorter because everyone sees the same reality.', name: 'Leila Duarte', role: 'Operations Lead' },
  { quote: 'It is rare to find software that improves process and communication at once.', name: 'Tom Becker', role: 'Delivery Manager' },
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

const stats = [
  { value: 320, suffix: 'k+', label: 'Workflows run' },
  { value: 99.95, suffix: '%', label: 'Platform uptime', decimals: 2 },
  { value: 42, suffix: '', label: 'Countries active' },
  { value: 28, prefix: '$', suffix: 'M+', label: 'Revenue influenced' },
]

function TiltCard({ children, className = '', strength = 8, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    node.style.transform = `perspective(900px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateY(-4px)`
  }

  const onLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export default function AcmeApp() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [closingFaqIndex, setClosingFaqIndex] = useState(null)
  const [queuedFaqIndex, setQueuedFaqIndex] = useState(null)
  const closeTimerRef = useRef(null)
  const queuedFaqIndexRef = useRef(null)

  const clearFaqTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  useEffect(() => {
    return () => clearFaqTimer()
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
      }, 200)
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
      }, 200)
      return
    }

    setOpenFaqIndex(index)
  }

  return (
    <div className="overflow-x-hidden bg-[#F5F1E7] text-[#111] selection:bg-[#F1BB36] selection:text-black">
      <Header />

      <main id="top">
        <Hero />

        {/* Platform overview */}
        <section className="border-b-4 border-black bg-[#F5F1E7]">
          <div className="grid w-full lg:grid-cols-2">
            <div className="relative flex min-h-[28rem] items-center justify-center overflow-hidden border-b-4 border-black bg-[#F35D68] p-10 lg:border-b-0 lg:border-r-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(45deg, rgba(255,255,255,0.18) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.18) 75%, transparent 75%, transparent)',
                  backgroundSize: '36px 36px',
                }}
              />
              <Reveal variant="scale" className="relative h-60 w-60">
                <div className="absolute left-0 top-0 h-28 w-28 rounded-full border-4 border-black bg-white shadow-[8px_8px_0px_0px_black] acme-orbit-a" />
                <div className="absolute right-2 top-16 h-36 w-36 rotate-45 border-4 border-black bg-[#F1BB36] shadow-[10px_10px_0px_0px_black] acme-orbit-b" />
                <div className="absolute left-24 top-12 h-24 w-24 border-4 border-black bg-black shadow-[6px_6px_0px_0px_white] acme-orbit-c" />
              </Reveal>
            </div>

            <div className="flex items-center bg-white px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
              <div className="max-w-xl space-y-6">
                <Reveal>
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-[#F35D68]">Platform overview</p>
                </Reveal>
                <Reveal delay={100}>
                  <h2 className="text-balance text-4xl font-black uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl">
                    Coordinate people, systems, and timelines in one operational layer.
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  <p className="text-pretty text-base leading-relaxed text-[#333] sm:text-lg">
                    Replace scattered status updates with structured workflows and live visibility.
                    Keep teams aligned from intake to delivery.
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <div className="grid grid-cols-3 gap-3 pt-4 text-center text-xs font-black uppercase tracking-[0.24em] sm:gap-4">
                    <div className="border-2 border-black bg-[#F5F1E7] px-3 py-4 transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_black]">Plan</div>
                    <div className="border-2 border-black bg-[#F1BB36] px-3 py-4 transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_black]">Build</div>
                    <div className="border-2 border-black bg-[#F35D68] px-3 py-4 text-white transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_black]">Ship</div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b-4 border-black bg-[#F1BB36]">
          <div className="grid w-full grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <AnimatedStat
                key={stat.label}
                index={index}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                label={stat.label}
              />
            ))}
          </div>
        </section>

        {/* Partners */}
        <section id="product" className="border-b-4 border-black bg-[#F5F1E7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Partners"
              title="Trusted by operational leaders"
              subtitle="A fictional ecosystem of teams and tools built around Northstar workflows."
              center
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {sponsorCards.map((card, idx) => (
                <Reveal key={card.title} delay={idx * 120}>
                  <TiltCard className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_black] hover:shadow-[12px_12px_0px_0px_black] sm:p-5">
                    <div className="relative flex aspect-[1.1] items-center justify-center overflow-hidden border-4 border-black bg-[#111] p-5">
                      <div
                        aria-hidden="true"
                        className="acme-radar pointer-events-none absolute inset-0"
                      />
                      <div className="relative h-56 w-56 rounded-full border-4 border-black bg-[#F5F1E7] flex items-center justify-center overflow-hidden">
                        <div className="h-40 w-40 rounded-full border-4 border-black bg-gradient-to-br from-[#111] via-[#333] to-[#F35D68] acme-disc-spin" />
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
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Insights */}
        <section id="features" className="relative overflow-hidden border-b-4 border-black bg-[#181817] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '24px 24px, 32px 32px',
            }}
          />
          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Operational insights"
              title="Latest briefings from northstar journal"
              subtitle="Field notes, process ideas, and execution patterns from growing teams."
              dark
              center
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {insights.map((post, index) => (
                <Reveal key={post.title} delay={index * 120} className="h-full">
                  <TiltCard
                    strength={6}
                    className="group h-full overflow-hidden border-4 border-black bg-white text-[#111] shadow-[8px_8px_0px_0px_black] hover:shadow-[12px_12px_0px_0px_black]"
                  >
                    <div
                      className={`relative h-40 overflow-hidden border-b-4 border-black ${
                        index === 1 ? 'bg-[#111]' : index === 2 ? 'bg-[#F1BB36]' : 'bg-[#F35D68]'
                      }`}
                    >
                      <div
                        aria-hidden="true"
                        className="acme-card-grid absolute inset-0 opacity-25"
                      />
                      <div className="relative flex h-full items-center justify-center text-7xl font-black text-white transition-transform duration-500 group-hover:scale-110">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="space-y-3 p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#F35D68]">{post.tag}</p>
                      <h3 className="text-2xl font-black uppercase leading-tight tracking-tighter">{post.title}</h3>
                      <p className="text-sm leading-relaxed text-[#444]">{post.blurb}</p>
                      <a
                        href="#"
                        className="group/link inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-[#111]"
                      >
                        Read more
                        <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                      </a>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="border-b-4 border-black bg-[#F5F1E7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Capabilities"
              title="A simple, transparent feature grid"
              subtitle="Small cards, strong borders, and one clear idea per tile."
              center
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature, index) => (
                <Reveal key={feature} delay={(index % 3) * 100} variant="up">
                  <TiltCard
                    strength={4}
                    className="group relative overflow-hidden border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_black] hover:shadow-[10px_10px_0px_0px_black]"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F1BB36] opacity-0 transition-all duration-500 group-hover:opacity-30"
                    />
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="space-y-4">
                        <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-[#F5F1E7] font-black transition-transform duration-300 group-hover:rotate-[-12deg]">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-lg font-black uppercase tracking-tight">{feature}</h3>
                      </div>
                      <div
                        className={`h-3 w-3 border border-black transition-transform duration-300 group-hover:scale-150 ${
                          index % 3 === 0 ? 'bg-[#F35D68]' : index % 3 === 1 ? 'bg-[#52C6BF]' : 'bg-[#F1BB36]'
                        }`}
                      />
                    </div>
                    <p className="relative mt-4 text-sm leading-relaxed text-[#444]">
                      Thoughtful spacing and contrast keep the card easy to scan even as the list grows.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-black/60 transition-all duration-300 group-hover:text-[#F35D68]">
                      <span className="h-[2px] w-6 bg-current transition-all duration-300 group-hover:w-10" />
                      Explore
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process steps */}
        <section id="work" className="border-b-4 border-black bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Process"
              title="How northstar works"
              subtitle="Three practical steps from setup to high-velocity execution."
              center
            />

            <div className="mt-20 grid gap-12 lg:grid-cols-3 lg:gap-10">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 160}>
                  <article className="group relative border-4 border-black bg-[#F5F1E7] p-6 shadow-[8px_8px_0px_0px_black] transition-all duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_black]">
                    <div className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center border-4 border-black bg-white text-xl font-black shadow-[4px_4px_0px_0px_black] transition-transform duration-300 group-hover:rotate-12">
                      {index + 1}
                    </div>
                    <div className="pt-7 text-center">
                      <h3 className="text-2xl font-black uppercase tracking-tighter">{step.title}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-[#444]">{step.text}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-full top-1/2 hidden h-1 w-12 lg:block">
                        <div className="acme-step-line h-full w-full bg-black" />
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why teams */}
        <section className="relative overflow-hidden border-b-4 border-black bg-[#F35D68] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 top-12 h-40 w-40 rounded-full border-4 border-black bg-[#F1BB36] opacity-90 acme-float-slow"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 bottom-12 h-40 w-40 border-4 border-black bg-black acme-float-fast"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Value"
                title="Why teams choose northstar"
                subtitle="A focused set of benefits that explains the value without adding clutter."
                dark
              />
              <Reveal delay={200}>
                <p className="max-w-sm text-xs font-black uppercase tracking-[0.3em] text-white/85">
                  A visual system built for confidence and momentum.
                </p>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason, idx) => (
                <Reveal key={reason.title} delay={idx * 100}>
                  <TiltCard
                    strength={4}
                    className="border-4 border-black bg-white p-5 text-[#111] shadow-[6px_6px_0px_0px_black] hover:shadow-[10px_10px_0px_0px_black]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-[#F1BB36] text-sm font-black shadow-[3px_3px_0px_0px_black]">
                        ✓
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tighter">{reason.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#444]">{reason.text}</p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b-4 border-black bg-[#F5F1E7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Social proof"
              title="Trusted by high-output operators"
              subtitle="Feedback from fictional leaders running complex programs at scale."
              center
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <Reveal key={item.name} delay={(index % 3) * 100} className="h-full">
                  <TiltCard
                    strength={4}
                    className="group h-full border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_black] hover:shadow-[10px_10px_0px_0px_black]"
                  >
                    <div className="mb-2 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-3 w-3 border border-black ${
                            index % 2 === 0 ? 'bg-[#F35D68]' : 'bg-[#52C6BF]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#222]">&ldquo;{item.quote}&rdquo;</p>
                    <div className="mt-5 flex items-center gap-3 border-t-2 border-black pt-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-black text-xs font-black ${
                          index % 3 === 0 ? 'bg-[#F35D68] text-white' : index % 3 === 1 ? 'bg-[#F1BB36]' : 'bg-[#52C6BF] text-white'
                        }`}
                      >
                        {item.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight">{item.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#666]">{item.role}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b-4 border-black bg-[#F5F1E7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Pricing"
              title="Flexible pricing for every stage"
              subtitle="Three plans tuned for launch teams, scaling orgs, and global operations."
              center
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8 lg:items-stretch">
              {pricingPlans.map((plan, idx) => (
                <Reveal key={plan.name} delay={idx * 140} className="h-full">
                  <article
                    className={`group relative flex h-full flex-col border-4 border-black p-6 shadow-[8px_8px_0px_0px_black] transition-all duration-300 hover:-translate-y-2 hover:shadow-[14px_14px_0px_0px_black] ${
                      plan.tone === 'highlight' ? 'bg-[#F1BB36]' : 'bg-white'
                    } ${plan.tone === 'highlight' ? 'lg:-translate-y-4' : ''}`}
                  >
                    {plan.tone === 'highlight' && (
                      <span className="acme-badge absolute -right-3 -top-3 inline-flex items-center gap-2 border-2 border-black bg-[#F35D68] px-3 py-1 text-[10px] font-black uppercase tracking-[0.35em] text-white shadow-[3px_3px_0px_0px_black]">
                        <span className="h-1.5 w-1.5 rounded-full bg-white acme-pulse" />
                        Most popular
                      </span>
                    )}
                    <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#666]">Plan</p>
                    <h3 className="mt-2 text-3xl font-black uppercase tracking-tighter">{plan.name}</h3>
                    <div className="mt-4 border-y-4 border-black py-4">
                      <div className="text-4xl font-black uppercase tracking-tighter">{plan.price}</div>
                      <div className="mt-1 text-xs font-black uppercase tracking-[0.3em] text-[#444]">{plan.subtitle}</div>
                    </div>
                    <ul className="mt-5 flex-1 space-y-3 text-sm leading-relaxed text-[#222]">
                      {plan.features.map((feature, fIdx) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 transition-transform duration-300 hover:translate-x-1"
                          style={{ transitionDelay: `${fIdx * 30}ms` }}
                        >
                          <span className="mt-1 inline-block h-2.5 w-2.5 border border-black bg-[#F35D68]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <ActionButton
                        variant={plan.tone === 'highlight' ? 'primary' : 'outline'}
                        className="w-full text-xs"
                      >
                        {plan.name === 'Constellation' ? 'Contact sales' : 'Start free trial'}
                      </ActionButton>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
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
                <Reveal key={item} delay={index * 80}>
                  <article
                    className={`group border-4 border-black bg-[#F5F1E7] shadow-[6px_6px_0px_0px_black] transition-all duration-200 ease-out hover:shadow-[8px_8px_0px_0px_black] ${
                      closingFaqIndex === index ? 'translate-y-[-2px] scale-[0.995]' : ''
                    } ${openFaqIndex === index ? 'bg-white' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => handleFaqToggle(index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-black uppercase tracking-[0.2em]"
                      aria-expanded={openFaqIndex === index}
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={`flex h-7 w-7 items-center justify-center border-2 border-black text-[10px] transition-colors duration-200 ${
                            openFaqIndex === index ? 'bg-[#F35D68] text-white' : 'bg-white'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>{item}</span>
                      </span>
                      <span
                        className={`flex h-7 w-7 items-center justify-center border-2 border-black text-base transition-all duration-300 ${
                          openFaqIndex === index ? 'rotate-45 bg-[#F1BB36]' : 'bg-white'
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden border-t-4 border-black px-5 text-sm leading-relaxed text-[#444] transition-all duration-300 ease-out ${
                        openFaqIndex === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                      }`}
                    >
                      Northstar can be configured gradually. Most teams start with one workflow, validate adoption, then scale to additional regions and functions.
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-b-4 border-black bg-[#F1BB36] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 bottom-0 h-44 w-44 rounded-full border-4 border-black bg-[#F35D68] opacity-90 acme-float-slow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-44 w-44 border-l-4 border-b-4 border-black bg-[#52C6BF] acme-float-fast"
            style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative mx-auto max-w-5xl text-center">
            <SectionHeading
              eyebrow="Final call to action"
              title="Ready to transform your workflow?"
              subtitle="Bring planning, execution, and reporting into one bold operational surface."
              center
            />
            <Reveal delay={300}>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <ActionButton variant="primary">
                  Start free trial
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </ActionButton>
                <ActionButton variant="secondary">Schedule a demo</ActionButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#111] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#F35D68] acme-pulse" />
                <span className="h-3 w-3 rounded-none bg-[#52C6BF] acme-pulse" style={{ animationDelay: '0.3s' }} />
                <span
                  className="h-3 w-3 bg-[#F1BB36] acme-pulse"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', animationDelay: '0.6s' }}
                />
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-white/80">
                Northstar is a fictional operations platform for fast-moving teams that need clarity,
                accountability, and execution at scale.
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-black uppercase tracking-[0.35em] text-[#F1BB36]">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {column.links.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#F1BB36]"
                      >
                        <span className="h-[2px] w-0 bg-[#F1BB36] transition-all duration-300 group-hover:w-4" />
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs uppercase tracking-[0.28em] text-white/60 sm:flex-row sm:items-center">
            <span>2026 Northstar Systems. All rights reserved.</span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F35D68] acme-pulse" />
              Crafted with intention
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
