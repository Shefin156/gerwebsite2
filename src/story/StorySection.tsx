import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { scrollToTarget } from '../hooks/smoothScroll'
import { Icon } from '../components/ui/Icon'
import { StoryScene } from './StoryScene'
import type { StoryHandles } from './Director'
import { CHAIN, CHAPTERS, NARROW, STORY_SCREENS, WIDE_FOV } from './timeline'

let storyEl: HTMLElement | null = null

/** Page Y at which the story reaches `progress` (0–1). Used by nav links. */
export function storyY(progress: number) {
  if (!storyEl) return 0
  const top = storyEl.getBoundingClientRect().top + window.scrollY
  return top + progress * (storyEl.offsetHeight - window.innerHeight)
}

export const scrollToChapter = (key: string) => {
  const c = CHAPTERS.find((ch) => ch.key === key)
  if (c) scrollToTarget(storyY(c.range[0] + 0.05))
}

/**
 * Tall section with a sticky full-screen canvas. Scrolling through it drives the
 * disassembly; the regular page continues below.
 */
export function StorySection({ onReady }: { onReady: () => void }) {
  const narrow = useMediaQuery(`(max-width: ${NARROW.maxWidth}px)`)
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef(0)
  const [activeChapter, setActiveChapter] = useState(0)
  const [visible, setVisible] = useState(true)

  const blocks = useRef<(HTMLElement | null)[]>([])
  const scrims = useRef<(HTMLDivElement | null)[]>([])
  const scrollHint = useRef<HTMLDivElement | null>(null)
  const handles = useMemo<StoryHandles>(() => ({ blocks, scrims, scrollHint }), [])

  // scroll progress through the section (no re-render)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    storyEl = el
    const update = () => {
      const rect = el.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      progressRef.current = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      if (storyEl === el) storyEl = null
    }
  }, [])

  // pause rendering while the story is off screen
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '200px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const onChapterChange = useCallback((i: number) => setActiveChapter(i), [])
  const step = CHAPTERS[activeChapter].chainStep
  const passed = CHAIN.filter((c) => c.range[1] <= CHAPTERS[activeChapter].range[0]).length
  const chainVisible = activeChapter > 0 && activeChapter < CHAPTERS.length - 1

  return (
    <section ref={sectionRef} id="process" aria-label="How a biogas plant works" style={{ height: `${STORY_SCREENS * 100}svh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-white">
        <Canvas
          frameloop={visible ? 'always' : 'never'}
          dpr={[1, narrow ? 1.5 : 2]}
          camera={{ fov: narrow ? NARROW.fov : WIDE_FOV, near: 1, far: 1600, position: [-80, 56, 80] }}
          gl={{ antialias: true }}
          onCreated={() => requestAnimationFrame(() => requestAnimationFrame(onReady))}
          aria-hidden
        >
          <Suspense fallback={null}>
            <StoryScene progressRef={progressRef} handles={handles} activeChapter={activeChapter} onChapterChange={onChapterChange} narrow={narrow} />
          </Suspense>
        </Canvas>

        {/* soft white fades keep text readable over the model (desktop) */}
        {(['left', 'right'] as const).map((side, i) => (
          <div
            key={side}
            ref={(el) => {
              scrims.current[i] = el
            }}
            className={`pointer-events-none absolute inset-y-0 hidden w-[50vw] md:block ${
              side === 'left' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'
            } from-white via-white/80 to-white/0`}
            style={{ opacity: side === 'left' ? 1 : 0 }}
          />
        ))}

        {/* chapter text */}
        {CHAPTERS.map((c, i) => {
          const isHero = i === 0
          const sideCls = c.side === 'left' ? 'md:left-[6vw]' : 'md:right-[6vw]'
          const Heading = isHero ? 'h1' : 'h2'
          return (
            <div
              key={c.key}
              ref={(el) => {
                blocks.current[i] = el
              }}
              className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-6 pb-10 pt-24 text-center
                md:inset-x-auto md:bottom-auto md:top-1/2 md:w-[min(31rem,38vw)] md:-translate-y-1/2 md:bg-none md:p-0 md:text-left ${sideCls}`}
              style={{ opacity: isHero ? 1 : 0, '--accent': c.accent ?? '#2F7D4F' } as CSSProperties}
            >
              <div className="overlay-inner">
                <p className="eyebrow flex items-center justify-center gap-2.5 text-primary md:justify-start">
                  {c.accent && <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.accent }} />}
                  {c.copy.eyebrow}
                </p>
                <Heading className={`mt-4 font-light leading-[1.04] tracking-tight text-ink ${isHero ? 'text-[2.6rem] md:text-7xl' : 'text-3xl md:text-5xl'}`}>
                  {c.copy.title}
                </Heading>
                <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted md:mx-0 md:text-base">{c.copy.body}</p>
                {c.copy.fact && (
                  <div className="mx-auto mt-6 inline-flex items-baseline gap-3 rounded-2xl border border-hairline bg-white/80 px-4 py-3 text-left backdrop-blur md:mx-0">
                    <span className="text-2xl font-light tracking-tight text-ink">{c.copy.fact.value}</span>
                    <span className="max-w-[14rem] text-[13px] leading-snug text-muted">{c.copy.fact.label}</span>
                  </div>
                )}
                {isHero && (
                  <div className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                    <button type="button" onClick={() => scrollToChapter('biomass')} className="btn-primary">
                      See how it works <Icon name="arrow" className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => scrollToTarget('projects')} className="btn-ghost">
                      Our projects
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Biomass → Quality Biogas → Electricity */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-[84px] mx-auto flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-hairline bg-white/85 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.12em] text-muted backdrop-blur-md transition-all duration-500 md:gap-2 md:px-4 md:text-[11px] md:tracking-[0.14em] ${
            chainVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
          aria-hidden={!chainVisible}
        >
          {CHAIN.map((c, i) => {
            const active = step === c.chainStep
            const done = i < passed && !active
            return (
              <div key={c.key} className="flex items-center gap-1.5 md:gap-2">
                {i > 0 && <span className="h-px w-2 bg-hairline md:w-6" />}
                <span
                  className="h-2 w-2 rounded-full bg-mint transition-all duration-500"
                  style={{ background: active || done ? c.accent : undefined, boxShadow: active ? `0 0 0 4px ${c.accent}33` : undefined }}
                />
                <span className={`transition-colors duration-500 ${active ? 'text-ink' : ''}`}>{c.copy.eyebrow.split('/ ')[1]}</span>
              </div>
            )
          })}
        </div>

        {/* chapter dots */}
        <nav className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex" aria-label="Story chapters">
          {CHAPTERS.map((c, i) => (
            <button
              key={c.key}
              type="button"
              onClick={() => scrollToTarget(storyY(i === 0 ? 0 : c.range[0] + 0.05))}
              className="group flex items-center justify-end gap-3"
              aria-label={c.copy.eyebrow}
              aria-current={i === activeChapter ? 'step' : undefined}
            >
              <span className="pointer-events-none translate-x-1 whitespace-nowrap text-[11px] text-muted opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                {c.copy.eyebrow.replace(/^\d+ \/ /, '')}
              </span>
              <span
                className={`block rounded-full transition-all duration-500 ${i === activeChapter ? 'h-6 w-1.5 bg-primary' : 'h-1.5 w-1.5 bg-ink/20 group-hover:bg-ink/40'}`}
              />
            </button>
          ))}
        </nav>

        <div
          ref={scrollHint}
          className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-label text-muted md:flex"
        >
          Scroll to explore
          <span className="scroll-line" />
        </div>
      </div>
    </section>
  )
}
