/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./gingr_theme/**/*.liquid",
    "./gingr_theme/**/*.json",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // White-label: driven by theme settings (css-variables.liquid)
        brand: {
          primary: 'var(--color-primary)',
          accent: 'var(--color-accent)',
          background: 'var(--color-background)',
          heading: 'var(--text-heading)',
          body: 'var(--text-body)',
          subheading: 'var(--text-subheading)',
        },
        gingr: {
          navy: '#0b0f0e',
          yellow: '#ffe14e',
          mint: '#52b788',
          bg: '#0b0f0e',
          font: '#f5f5f5',
          energy: '#ffd400',
          'energy-dark': '#c6a600',
          immunity: '#e3a018',
          'immunity-dark': '#9e6b00',
          focus: '#006d77',
          'focus-dark': '#004b52',
          recover: '#c1121f',
          'recover-dark': '#780000',
          digest: '#7cb342',
          'digest-dark': '#558b2f',
        },
      },
      fontFamily: {
        primary: ['var(--font-primary--family)', 'sans-serif'],
      },
      backdropBlur: {
        0: '0',
      },
    },
  },
  safelist: [
    'opacity-0',
    'opacity-100',
    'translate-y-0',
    'translate-y-4',
    'hidden',
    'block',
    'flex',
    'bg-white',
    'text-black',
    'bg-white/5',
    'text-white/60',
  ],
  plugins: [],
};
