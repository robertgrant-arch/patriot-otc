import type { Config } from 'tailwindcss'

// Fix #12: Brand tokens, senior font sizes, data file scanning
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        patriot: {
          red:   '#B91C1C',
          blue:  '#1E3A5F',
          white: '#FFFFFF',
        },
      },
      fontSize: {
        'senior-body': ['1.125rem', { lineHeight: '1.75' }],
        'senior-lg':   ['1.25rem',  { lineHeight: '1.75' }],
      },
    },
  },
  plugins: [],
}

export default config
