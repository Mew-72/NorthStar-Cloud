import { useRef } from 'react'

export default function ActionButton({ variant = 'primary', className = '', children, ...props }) {
  const ref = useRef(null)

  const variants = {
    primary: 'border-[#181817] bg-[#181817] text-white hover:border-[#F35D68] hover:bg-[#F35D68] hover:text-white',
    secondary: 'border-white/30 bg-white text-[#181817] hover:border-[#181817] hover:bg-[#181817] hover:text-white',
    dark: 'border-[#181817] bg-[#181817] text-white hover:bg-[#F1BB36] hover:text-[#181817]',
    outline: 'border-black/20 bg-transparent text-[#181817] hover:border-[#181817] hover:bg-black/5',
  }

  const handleMove = (e) => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = node.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    node.style.transform = `translate(${x * 0.06}px, ${y * 0.08}px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border px-6 py-3 text-xs font-semibold tracking-[0.04em] transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-out active:scale-[0.98] acme-magnetic ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span className="acme-shine pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100" aria-hidden="true" />
    </button>
  )
}
