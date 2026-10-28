import { BIOGAS_FACTS, CHP, TECHNOLOGIES } from '../../content/ger'
import { useInView } from '../../hooks/useInView'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const BAR_TONE = { muted: 'bg-ink/25', primary: 'bg-primary', accent: 'bg-[#3FBF8F]' }

function EfficiencyBars() {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="card p-6 md:p-8">
      <p className="eyebrow text-primary">Total system efficiency</p>
      <div className="mt-6 space-y-6">
        {CHP.bars.map((b, i) => (
          <div key={b.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-ink">{b.label}</span>
              <span className="font-medium tabular-nums text-ink">
                {b.from}–{b.to}%
              </span>
            </div>
            <div className="relative mt-2.5 h-2.5 overflow-hidden rounded-full bg-canvas-deep">
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${BAR_TONE[b.tone]} transition-[width] duration-[1400ms] ease-out`}
                style={{ width: inView ? `${b.to}%` : '0%', transitionDelay: `${i * 150}ms` }}
              />
              <div
                className="absolute inset-y-0 left-0 bg-white/35"
                style={{ width: inView ? `${b.from}%` : '0%', transition: 'width 1400ms ease-out', transitionDelay: `${i * 150}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[13px] leading-relaxed text-muted">Lighter band = lower end of the range.</p>
    </div>
  )
}

export function Technology() {
  return (
    <section id="technology" className="section bg-canvas-deep">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="GER proprietary technology"
          title="German engineering, built and supported locally."
          lead="Every stage of the plant, from gas treatment to the engine and its controls, is designed or assembled in-house."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TECHNOLOGIES.map((t, i) => (
            <Reveal key={t.title} delay={i * 80} className="card group flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint/50 text-primary transition group-hover:bg-primary group-hover:text-white">
                <Icon name={t.icon} />
              </span>
              <h3 className="mt-6 text-lg font-medium leading-snug tracking-tight text-ink">{t.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Co-generation" title={CHP.title} lead={CHP.body} />
            <Reveal className="mt-8 border-l-2 border-primary pl-5 text-[15px] leading-relaxed text-muted">
              <p className="mb-1 font-medium text-ink">Pin-tube heat exchanger</p>
              {CHP.exchanger}
            </Reveal>
            <Reveal className="mt-8 flex flex-wrap gap-2">
              {CHP.module.map((m) => (
                <span key={m} className="rounded-full border border-hairline bg-white px-3.5 py-1.5 text-[13px] text-ink">
                  {m}
                </span>
              ))}
            </Reveal>
          </div>
          <div className="space-y-4">
            <Reveal>
              <EfficiencyBars />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {BIOGAS_FACTS.map((f, i) => (
                <Reveal key={f.value} delay={i * 90} className="card p-6">
                  <p className="text-3xl font-light tracking-tight text-ink">{f.value}</p>
                  <p className="mt-2 text-[14px] leading-snug text-muted">{f.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
