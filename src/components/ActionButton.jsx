import { useRef } from 'react'

export default function ActionButton({ variant = 'primary', className = '', children, ...props }) {
  const ref = useRef(null)

  const variants = {
    primary: 'bg-[#D02020] text-white hover:bg-white hover:text-[#D02020]',
    secondary: 'bg-white text-black hover:bg-black hover:text-white',
    dark: 'bg-black text-white hover:bg-white hover:text-black',
    outline: 'bg-transparent text-black border-black hover:bg-black hover:text-white',
  }

  const handleMove = (e) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    node.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`
  }

  const handleLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.transform = 'translate(0px, 0px)'
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden border-2 border-black px-6 py-3 text-sm font-black uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_black] transition-[transform,background-color,color,box-shadow] duration-300 ease-out hover:shadow-[6px_6px_0px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none acme-magnetic ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      <span className="acme-shine pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100" aria-hidden="true" />
    </button>
  )
}
