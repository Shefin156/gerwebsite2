const PATHS: Record<string, string> = {
  leaf: 'M5 19c0-8 6-14 15-14 0 9-6 15-14 15H5zm0 0 8-8',
  drop: 'M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z',
  engine: 'M4 9h3l2-2h5l2 2h2v3h2v3h-2v3h-5l-2 2H8l-2-2H4zM10 11h4',
  chip: 'M8 8h8v8H8zM10 3v3m4-3v3m-4 12v3m4-3v3M3 10h3m-3 4h3m12-4h3m-3 4h3',
  pin: 'M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  shield: 'M12 3l7 3v6c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6zm-3 9 2 2 4-4',
  bolt: 'M13 3 5 13h6l-1 8 8-10h-6z',
  flame: 'M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-3 4.5-3 8a6 6 0 0 0 6 6z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M3 6h18v12H3zm0 0 9 7 9-7',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-9 9h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  arrowUp: 'M12 19V5m-6 6 6-6 6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm-3.5-1.2L7 21l5-3 5 3-1.5-7.2',
}

interface IconProps {
  name: keyof typeof PATHS | string
  className?: string
}

/** Minimal line icons (24×24, stroke = currentColor). */
export function Icon({ name, className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={PATHS[name] ?? PATHS.leaf} />
    </svg>
  )
}
