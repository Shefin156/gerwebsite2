import { ACHIEVEMENTS, ADVANTAGES } from '../../content/ger'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Advantages() {
  return (
    <section id="why-ger" className="section bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading tone="dark" eyebrow="Key advantages" title="Why plant owners choose GER." />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {ADVANTAGES.map((a, i) => (
            <Reveal key={a.title} delay={i * 90} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:bg-white/[0.07]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/30 text-mint">
                <Icon name={a.icon} />
              </span>
              <h3 className="mt-6 text-lg font-medium tracking-tight">{a.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/70">{a.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.label} delay={i * 90} className="bg-ink p-7 md:p-8">
              <p className="text-4xl font-light tracking-tight text-mint md:text-5xl">{a.value}</p>
              <p className="mt-3 text-[14px] leading-snug text-white/70">{a.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
