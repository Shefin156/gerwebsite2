import { useEffect, useRef } from 'react'
import { useInView } from '../../hooks/useInView'

/** Counts from 0 to `value` the first time it scrolls into view. */
export function CountUp({ value, suffix = '', duration = 1600 }: { value: number; suffix?: string; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>()
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || started.current) return
    started.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = value.toLocaleString('en-US') + suffix
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 4)
      el.textContent = Math.round(value * eased).toLocaleString('en-US') + suffix
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, suffix, duration, ref])

  return (
    <span ref={ref} aria-label={`${value.toLocaleString('en-US')}${suffix}`}>
      0{suffix}
    </span>
  )
}
