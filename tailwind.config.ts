import type { Config } from 'tailwindcss'
import { THEME } from './src/theme'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: THEME.canvas,
        'canvas-deep': THEME.canvasDeep,
        primary: THEME.primary,
        'primary-soft': THEME.primarySoft,
        mint: THEME.lightGreen,
        ink: THEME.ink,
        muted: THEME.muted,
        hairline: THEME.hairline,
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      letterSpacing: { label: '0.18em' },
      boxShadow: { lift: '0 18px 40px -20px rgba(28, 42, 33, 0.35)' },
    },
  },
  plugins: [],
} satisfies Config
