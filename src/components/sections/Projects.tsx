import { useState } from 'react'
import { PROJECTS, PROJECT_CATEGORIES, type ProjectCategory } from '../../content/ger'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const PREVIEW = 9

export function Projects() {
  const [tab, setTab] = useState<ProjectCategory>('epcc')
  const [expanded, setExpanded] = useState(false)
  const list = PROJECTS[tab]
  const shown = expanded ? list : list.slice(0, PREVIEW)
  const category = PROJECT_CATEGORIES.find((c) => c.key === tab)

  return (
    <section id="projects" className="section bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Project references"
            title="Proven across Southeast Asia and beyond."
            lead="From POME biogas power plants to gas treatment, SCADA and oil & gas packages."
          />
        </div>

        <Reveal className="mt-12">
          <div role="tablist" aria-label="Project categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
            {PROJECT_CATEGORIES.map((c) => {
              const active = tab === c.key
              return (
                <button
                  key={c.key}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls="project-panel"
                  onClick={() => {
                    setTab(c.key)
                    setExpanded(false)
                  }}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition ${
                    active ? 'border-ink bg-ink text-white' : 'border-hairline bg-white text-muted hover:border-ink/30 hover:text-ink'
                  }`}
                >
                  {c.label}
                  <span className={`rounded-full px-2 py-0.5 text-[11px] tabular-nums ${active ? 'bg-white/15' : 'bg-canvas-deep'}`}>
                    {PROJECTS[c.key].length}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="mt-5 text-[15px] text-muted">{category?.blurb}</p>
        </Reveal>

        <div id="project-panel" role="tabpanel" key={tab} className="tab-panel mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <article
              key={`${p.name}-${p.note ?? ''}`}
              className="card flex items-start gap-4 p-5 transition duration-300 hover:border-primary/40"
              style={{ animationDelay: `${Math.min(i, 12) * 35}ms` }}
            >
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-mint/50 text-primary">
                <Icon name={p.type.toLowerCase().includes('scrubber') ? 'leaf' : p.type.toLowerCase().includes('scada') ? 'chip' : tab === 'oilgas' ? 'flame' : 'bolt'} className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[15px] font-medium leading-snug text-ink">{p.name}</h3>
                <p className="mt-1 text-[13px] text-muted">
                  {p.type}
                  {p.note && <span className="ml-1.5 rounded bg-canvas-deep px-1.5 py-0.5 text-[11px] text-ink/70">{p.note}</span>}
                </p>
              </div>
            </article>
          ))}
        </div>

        {list.length > PREVIEW && (
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setExpanded((e) => !e)} className="btn-ghost">
              {expanded ? 'Show fewer' : `Show all ${list.length} projects`}
              <Icon name="arrow" className={`h-4 w-4 transition-transform ${expanded ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
