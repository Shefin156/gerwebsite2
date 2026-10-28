import { CONTACT } from '../../content/ger'
import { scrollToTarget } from '../../hooks/smoothScroll'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

export function CallToAction() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-primary px-7 py-14 text-white md:px-16 md:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#3FBF8F]/30 blur-3xl" aria-hidden />
        <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow text-mint">Start a project</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.1] tracking-tight md:text-5xl">Ready to turn your waste into power?</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              Talk to our team about biogas, gas engines, CHP or a concession model for your mill or facility.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <button type="button" onClick={() => scrollToTarget('contact')} className="btn bg-white text-primary hover:bg-mint">
              Contact us <Icon name="arrow" className="h-4 w-4" />
            </button>
            <a href={CONTACT.phones[0].href} className="btn border border-white/40 text-white hover:bg-white/10">
              <Icon name="phone" className="h-4 w-4" /> Call {CONTACT.phones[0].label}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
