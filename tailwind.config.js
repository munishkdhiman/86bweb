/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0055ff',
        'brand-blue-hover': '#0044dd',
        'brand-blue-glow': 'rgba(0, 85, 255, 0.12)',
        'brand-purple': '#8a2be2',
        'brand-purple-glow': 'rgba(138, 43, 226, 0.12)',
        'dark-bg': '#050505',
        'card-bg': '#0a0a0c',
      },
      fontFamily: {
        sans: ['var(--font-sora)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 8s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
