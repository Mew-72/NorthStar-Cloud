import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Keep the browser's native scroll model, but ease wheel and anchor movement.
 * Lenis respects prefers-reduced-motion and is destroyed cleanly on unmount.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -88 },
      lerp: 0.075,
      wheelMultiplier: 0.9,
      syncTouch: false,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
    })

    return () => lenis.destroy()
  }, [])

  return null
}
