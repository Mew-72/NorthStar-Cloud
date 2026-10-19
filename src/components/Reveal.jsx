import { useReveal } from '../hooks/useReveal'

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  variant = 'up',
  duration = 850,
  className = '',
  children,
  ...rest
}) {
  const [ref, visible] = useReveal()

  const variants = {
    up: visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
    down: visible ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0',
    left: visible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0',
    right: visible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0',
    fade: visible ? 'opacity-100' : 'opacity-0',
    scale: visible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0',
    blur: visible ? 'opacity-100 blur-0' : 'opacity-0 blur-md',
  }

  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        transitionProperty: 'transform, opacity, filter',
        willChange: 'transform, opacity, filter',
      }}
      className={`${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
