import { COMPANY, CREDENTIALS, PORTFOLIO_SUMMARY } from '../../content/ger'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="About GER"
            title={<>Over 25 years powering mills, farms and <span className="text-primary">communities.</span></>}
          />
          <Reveal className="mt-8 space-y-5 text-base leading-relaxed text-muted md:text-[17px]">
            <p>{COMPANY.intro}</p>
            <p>{COMPANY.intro2}</p>
          </Reveal>
          <Reveal as="ul" className="mt-8 grid gap-3 sm:grid-cols-2">
            {PORTFOLIO_SUMMARY.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint/60 text-primary">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </Reveal>
        </div>

        <div className="space-y-4">
          {CREDENTIALS.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="card flex gap-5 p-6 md:p-7">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint/50 text-primary">
                <Icon name={i === 0 ? 'award' : 'shield'} />
              </span>
              <div>
                <h3 className="text-lg font-medium tracking-tight text-ink">{c.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={300} className="rounded-2xl bg-ink p-6 text-white md:p-7">
            <p className="eyebrow text-mint">Parent company</p>
            <p className="mt-3 text-xl font-light tracking-tight">{COMPANY.parent}</p>
            <p className="mt-1 text-sm text-white/65">Listed on the {COMPANY.parentListing}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
