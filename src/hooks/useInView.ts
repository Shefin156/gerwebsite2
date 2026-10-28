import { useEffect, useRef, useState } from 'react'

/** True once (or while, if `once` is false) the element is in the viewport. */
export function useInView<T extends Element>({ once = true, rootMargin = '0px 0px -12% 0px', threshold = 0.15 } = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) setInView(false)
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, rootMargin, threshold])
  return [ref, inView] as const
}
