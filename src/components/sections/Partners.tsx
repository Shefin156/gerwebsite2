import { PARTNERS } from '../../content/ger'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Partners() {
  return (
    <section id="partners" className="section bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Technology partners" title="Backed by German engineering leaders." />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} className="card flex flex-col p-7 md:p-8">
              <p className="eyebrow text-primary">{p.role}</p>
              <p className="mt-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">{p.name}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
