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
      className={`group relative overflow-hidden border-b border-black/10 px-4 py-10 text-center transition-all duration-700 ease-out ${index % 2 === 0 ? 'bg-[#F1BB36]' : 'bg-white'} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} lg:border-b-0 ${index < 3 ? 'lg:border-r lg:border-r-black/10' : 'lg:border-r-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[.035] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <div className="relative">
        <div className={`mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-semibold ${index % 3 === 0 ? 'bg-[#F35D68] text-white' : index % 3 === 1 ? 'bg-[#181817] text-white' : 'bg-[#52C6BF] text-[#181817]'} transition-transform duration-300 group-hover:rotate-[12deg]`}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="font-['Space_Grotesk'] text-3xl font-semibold tracking-[-.07em] text-[#181817] sm:text-4xl lg:text-5xl">
          {prefix}{formatted}{suffix}
        </div>
        <div className="mt-3 text-[10px] font-semibold uppercase tracking-[.17em] text-[#59574F]">{label}</div>
      </div>
    </div>
  )
}
