import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export function SectionHeading({ eyebrow, title, lead, align = 'left', tone = 'light' }: SectionHeadingProps) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className={`eyebrow ${tone === 'dark' ? 'text-mint' : 'text-primary'}`}>{eyebrow}</p>
      <h2 className={`mt-4 text-3xl font-light leading-[1.1] tracking-tight md:text-5xl ${tone === 'dark' ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {lead && <p className={`mt-5 text-base leading-relaxed md:text-lg ${tone === 'dark' ? 'text-white/75' : 'text-muted'}`}>{lead}</p>}
    </Reveal>
  )
}
