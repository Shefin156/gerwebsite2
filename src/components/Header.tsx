import { useEffect, useRef, useState } from 'react'
import { NAV } from '../content/ger'
import { scrollToTarget } from '../hooks/smoothScroll'
import { scrollToChapter } from '../story/StorySection'
import { Icon } from './ui/Icon'
import { Logo } from './Logo'

const go = (id: string) => (id === 'process' ? scrollToChapter('biomass') : scrollToTarget(id))

/** Fixed header: transparent over the hero, solid once scrolled; active-section highlight; mobile menu. */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const progress = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // active nav item = last nav section whose top has passed the middle of the screen
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45
      let current: string | null = null
      const ordered = NAV.map((n) => document.getElementById(n.id))
        .filter((el): el is HTMLElement => !!el)
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
      for (const el of ordered) if (el.getBoundingClientRect().top <= mid) current = el.id
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className={`transition-colors duration-300 ${solid ? 'border-b border-hairline bg-white/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent'}`}>
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
          <button type="button" onClick={() => scrollToTarget(0)} aria-label="Back to top">
            <Logo />
          </button>

          <ul className="hidden items-center gap-8 text-[14px] lg:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => go(n.id)}
                  className={`relative py-2 transition-colors hover:text-ink ${active === n.id ? 'text-ink' : 'text-muted'}`}
                >
                  {n.label}
                  <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300 ${active === n.id ? 'scale-x-100' : 'scale-x-0'}`} />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => scrollToTarget('contact')} className="btn-primary hidden sm:inline-flex">
              Get in touch
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-ink/5 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </nav>
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-transparent">
          <div ref={progress} className="h-full origin-left scale-x-0 bg-primary" />
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-b border-hairline bg-white transition-[max-height,opacity] duration-300 lg:hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="px-5 py-3">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setOpen(false)
                  go(n.id)
                }}
                className="flex w-full items-center justify-between border-b border-hairline py-3.5 text-left text-[15px] text-ink last:border-0"
              >
                {n.label}
                <Icon name="arrow" className="h-4 w-4 text-muted" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
