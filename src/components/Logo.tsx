import { COMPANY } from '../content/ger'

/** Leaf mark + wordmark. */
export function Logo({ tone = 'dark', compact = false }: { tone?: 'dark' | 'light'; compact?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${tone === 'light' ? 'text-white' : 'text-ink'}`}>
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden>
        <path d="M16 3C9 3 4 8.5 4 16c0 7.2 5.4 13 12 13 7.5 0 12-5.5 12-13V3z" fill="#2F7D4F" />
        <path d="M10 22c3.5-5 7-8 12-10" stroke="#CDE6C8" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <span className="leading-tight">
        <span className="block text-[15px] font-semibold tracking-tight">{compact ? COMPANY.short : COMPANY.name}</span>
        {!compact && (
          <span className={`block text-[10px] uppercase tracking-[0.18em] ${tone === 'light' ? 'text-white/60' : 'text-muted'}`}>
            Waste to energy
          </span>
        )}
      </span>
    </span>
  )
}
