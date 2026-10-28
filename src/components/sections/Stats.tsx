import { STATS } from '../../content/ger'
import { CountUp } from '../ui/CountUp'
import { Reveal } from '../ui/Reveal'

export function Stats() {
  return (
    <section aria-label="GER in numbers" className="relative z-10 border-y border-hairline bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className={`px-5 py-10 md:px-8 md:py-14 ${i % 2 ? 'border-l' : ''} ${i >= 2 ? 'border-t md:border-t-0' : ''} md:border-l md:first:border-l-0 border-hairline`}>
            <p className="text-4xl font-light tracking-tight text-ink md:text-5xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-3 max-w-[14rem] text-[13px] leading-snug text-muted md:text-sm">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
