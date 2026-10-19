import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, center = false, dark = false }) {
  return (
    <div className={`${center ? 'text-center' : ''} max-w-3xl ${center ? 'mx-auto' : ''}`}>
      <Reveal variant="up" delay={0}>
        <p className={`inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] ${dark ? 'text-white/75' : 'text-[#77756E]'}`}>
          <span className={`inline-block h-px w-7 ${dark ? 'bg-[#F1BB36]' : 'bg-[#F35D68'} acme-eyebrow-pulse`} />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal variant="up" delay={100}>
        <h2 className={`mt-4 text-balance text-4xl font-bold uppercase leading-[.94] tracking-[-.065em] sm:text-5xl lg:text-6xl ${dark ? 'text-white' : 'text-[#181817]'}`}>
          {title}
        </h2>
      </Reveal>
      <Reveal variant="up" delay={200}>
        <p className={`mt-5 max-w-2xl text-pretty text-base leading-relaxed sm:text-lg ${dark ? 'text-white/70' : 'text-[#77756E]'} ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      </Reveal>
    </div>
  )
}
