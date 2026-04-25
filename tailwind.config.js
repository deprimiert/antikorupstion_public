/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
        display: ['"Cabinet Grotesk"', 'Geist', 'sans-serif'],
      },
      colors: {
        ink: {
          950: 'rgb(var(--ink-950) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
          800: 'rgb(var(--ink-800) / <alpha-value>)',
          700: 'rgb(var(--ink-700) / <alpha-value>)',
          500: 'rgb(var(--ink-500) / <alpha-value>)',
          300: 'rgb(var(--ink-300) / <alpha-value>)',
          100: 'rgb(var(--ink-100) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)',
          glow: 'rgb(var(--accent-glow) / <alpha-value>)',
        },
        halol: 'rgb(var(--halol) / <alpha-value>)',
        shadow: 'rgb(var(--shadow) / <alpha-value>)',
        invert: {
          fg: 'rgb(var(--invert-fg) / <alpha-value>)',
          bg: 'rgb(var(--invert-bg) / <alpha-value>)',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        inset: 'var(--shadow-inset)',
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
