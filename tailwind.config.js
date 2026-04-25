/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
        display: ['"Cabinet Grotesk"', 'Geist', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0a0a0b',
          900: '#111113',
          800: '#17171a',
          700: '#1f2024',
          500: '#6b6d75',
          300: '#c2c4cc',
          100: '#ececef',
        },
        accent: {
          DEFAULT: '#e03a3a',
          soft: '#b32e2e',
          glow: '#ff5a5a',
        },
        halol: '#5cc08a',
        shadow: '#d4a24a',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        card: '0 20px 40px -15px rgba(0,0,0,0.55)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-5%)' },
          '30%': { transform: 'translate(3%,-2%)' },
          '50%': { transform: 'translate(-3%,3%)' },
          '70%': { transform: 'translate(4%,4%)' },
          '90%': { transform: 'translate(-4%,2%)' },
        },
        breath: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        grain: 'grain 8s steps(8) infinite',
        breath: 'breath 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
