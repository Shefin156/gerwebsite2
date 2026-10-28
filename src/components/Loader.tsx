import { useEffect, useState } from 'react'

/** Shown until the 3D scene has rendered (with a safety timeout), then fades away. */
export function Loader({ ready }: { ready: boolean }) {
  const [timedOut, setTimedOut] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setTimedOut(true), 5000)
    return () => window.clearTimeout(t)
  }, [])
  const hidden = ready || timedOut
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white transition-opacity duration-700 ${
        hidden ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-hidden={hidden}
    >
      <span className="text-[11px] font-medium uppercase tracking-label text-muted">Preparing the plant</span>
      <span className="loader-bar" />
    </div>
  )
}
