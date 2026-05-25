import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#080B12',
        bg1:     '#0D1117',
        bg2:     '#111827',
        bg3:     '#1A2235',
        blue:    '#2D6FFF',
        cyan:    '#00D4FF',
        text1:   '#F0F4FF',
        text2:   '#8B95A8',
        text3:   '#4A5568',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '14px',
        lg2:  '24px',
      },
    },
  },
  plugins: [],
}

export default config
