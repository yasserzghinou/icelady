import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/blog/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#f6f2ec',
        text: '#1f1a16',
        stone: '#c7b9a4',
        accent: '#a57643',
        accentDark: '#7b5229'
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 40px rgba(31, 26, 22, 0.08)'
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        reveal: 'reveal 700ms ease-out forwards'
      }
    }
  },
  plugins: []
};

export default config;
