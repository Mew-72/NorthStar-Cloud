import { useReveal } from '../hooks/useReveal'
import { useCountUp } from '../hooks/useCountUp'

export default function AnimatedStat({ value, suffix = '', prefix = '', label, index = 0, decimals = 0 }) {
  const [ref, visible] = useReveal({ threshold: 0.4 })
  const current = useCountUp(value, { duration: 1600, decimals, enabled: visible })

  const formatted =
    decimals === 0 ? Math.round(current).toLocaleString('en-US') : current.toFixed(decimals)

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden border-b-4 border-black px-4 py-10 text-center transition-all duration-700 ease-out ${
        index % 2 === 0 ? 'bg-[#F0C020]' : 'bg-white'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} lg:border-b-0 ${
        index < 3 ? 'lg:border-r-4' : 'lg:border-r-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <div className="relative">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-[#D02020] text-sm font-black text-white shadow-[3px_3px_0px_0px_black] transition-transform duration-300 group-hover:rotate-[20deg]">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="text-3xl font-black uppercase tracking-tighter text-[#111] sm:text-4xl lg:text-5xl">
          {prefix}
          {formatted}
          {suffix}
        </div>
        <div className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-[#333]">{label}</div>
      </div>
    </div>
  )
}
