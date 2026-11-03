/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.md",
    "./docs/.vitepress/**/*.{js,ts,vue,md,html}",
    "./docs/**/*.{vue,js,ts,jsx,tsx,html}",
    "!./**/node_modules/**"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'kuka-orange': '#FF6A00',
        'kuka-dark': '#0B0E11',
        'kuka-darker': '#090B0D',
        'kuka-gray': '#14191E',
        'kuka-border': '#2C353E'
      },
      fontFamily: {
        sans: ['Bahnschrift', 'DIN Alternate', 'Segoe UI', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Cascadia Mono', 'JetBrains Mono', 'Roboto Mono', 'Consolas', 'ui-monospace', 'monospace']
      }
    },
  },
  plugins: [],
}
