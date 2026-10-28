import { CLIENTS, COUNTRIES } from '../../content/ger'
import { Reveal } from '../ui/Reveal'

export function Clients() {
  const row = [...CLIENTS, ...CLIENTS]
  return (
    <section aria-label="Key clients" className="border-y border-hairline bg-white py-16 md:py-20">
      <Reveal className="mx-auto max-w-7xl px-5 text-center md:px-8">
        <p className="eyebrow text-primary">Trusted by industry leaders</p>
      </Reveal>
      <div className="marquee group relative mt-10 overflow-hidden" aria-label={CLIENTS.join(', ')}>
        <div className="marquee-track flex w-max gap-14 pr-14 group-hover:[animation-play-state:paused] md:gap-20 md:pr-20" aria-hidden>
          {row.map((c, i) => (
            <span key={i} className="whitespace-nowrap text-2xl font-semibold tracking-tight text-ink/35 transition-colors hover:text-ink md:text-3xl">
              {c}
            </span>
          ))}
        </div>
      </div>
      <Reveal className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2 px-5">
        {COUNTRIES.map((c) => (
          <span key={c} className="rounded-full border border-hairline px-4 py-1.5 text-[13px] text-muted">
            {c}
          </span>
        ))}
      </Reveal>
    </section>
  )
}
