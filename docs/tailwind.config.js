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
        'kuka-orange': '#FF6600',
        'kuka-dark': '#0D1117',
        'kuka-darker': '#090C10',
        'kuka-gray': '#161B22',
        'kuka-border': '#30363D'
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'ui-monospace', 'monospace']
      }
    },
  },
  plugins: [],
}
