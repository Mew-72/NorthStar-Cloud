import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, { duration = 1800, start = 0, decimals = 0, enabled = true } = {}) {
  const [value, setValue] = useState(start)
  const rafRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!enabled || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const ease = (t) => 1 - Math.pow(1 - t, 3)

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = ease(progress)
      const current = start + (target - start) * eased
      setValue(decimals === 0 ? Math.round(current) : Number(current.toFixed(decimals)))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, target, start, duration, decimals])

  return value
}
