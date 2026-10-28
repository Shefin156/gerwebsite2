import { useEffect } from 'react'
import Lenis from 'lenis'

/** Header height used to offset anchor scrolling. */
export const HEADER_OFFSET = 72

let lenis: Lenis | null = null

/** Buttery page scrolling (disabled for visitors who prefer reduced motion). */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3) })
    lenis = instance
    let raf = 0
    const loop = (time: number) => {
      instance.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      instance.destroy()
      lenis = null
    }
  }, [])
}

/** Smooth-scroll to an absolute page Y, an element id, or an element. */
export function scrollToTarget(target: number | string | HTMLElement) {
  let y: number
  if (typeof target === 'number') y = target
  else {
    const el = typeof target === 'string' ? document.getElementById(target) : target
    if (!el) return
    y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  }
  if (lenis) lenis.scrollTo(Math.max(0, y), { duration: 1.4 })
  else window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
}
