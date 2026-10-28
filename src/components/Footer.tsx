import type { ReactNode } from 'react'
import { COMPANY, CONTACT, NAV } from '../content/ger'
import { scrollToTarget } from '../hooks/smoothScroll'
import { scrollToChapter } from '../story/StorySection'
import { Icon } from './ui/Icon'
import { Logo } from './Logo'

const SOLUTIONS = ['POME biogas power plants', 'Gas engines & CHP', 'Biological gas treatment', 'S&M and BOOT concessions']

export function Footer() {
  const go = (id: string) => (id === 'process' ? scrollToChapter('biomass') : scrollToTarget(id))
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-white/65">{COMPANY.tagline}</p>
            <p className="mt-4 text-[13px] text-white/45">
              A {COMPANY.parent} company · Est. {COMPANY.founded}
            </p>
          </div>

          <FooterColumn title="Explore">
            {NAV.map((n) => (
              <li key={n.id}>
                <button type="button" onClick={() => go(n.id)} className="footer-link">
                  {n.label}
                </button>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Solutions">
            {SOLUTIONS.map((s) => (
              <li key={s}>
                <button type="button" onClick={() => scrollToTarget('technology')} className="footer-link text-left">
                  {s}
                </button>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <li className="text-white/65">{CONTACT.address}</li>
            {CONTACT.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="footer-link">
                  {p.label}: {p.value}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT.email}`} className="footer-link break-all">
                {CONTACT.email}
              </a>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <button type="button" onClick={() => scrollToTarget(0)} className="footer-link inline-flex items-center gap-2 self-start md:self-auto">
            Back to top <Icon name="arrowUp" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow text-mint">{title}</p>
      <ul className="mt-5 space-y-3 text-[14px]">{children}</ul>
    </div>
  )
}
