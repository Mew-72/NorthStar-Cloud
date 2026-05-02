import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, center = false, dark = false }) {
  return (
    <div className={`${center ? 'text-center' : ''} max-w-3xl ${center ? 'mx-auto' : ''}`}>
      <Reveal variant="up" delay={0}>
        <p
          className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] ${
            dark ? 'text-white/85' : 'text-[#111]'
          }`}
        >
          <span
            className={`inline-block h-2 w-6 ${dark ? 'bg-[#F0C020]' : 'bg-[#D02020]'} acme-eyebrow-pulse`}
          />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal variant="up" delay={100}>
        <h2
          className={`mt-3 text-balance text-4xl font-black uppercase leading-[0.92] tracking-tighter sm:text-5xl lg:text-6xl ${
            dark ? 'text-white' : 'text-[#111]'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      <Reveal variant="up" delay={200}>
        <p className={`mt-4 text-pretty text-base leading-relaxed sm:text-lg ${dark ? 'text-white/90' : 'text-[#333]'}`}>
          {subtitle}
        </p>
      </Reveal>
    </div>
  )
}
