/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1C2321",
        paper: "#F3F5F2",
        ledger: "#1F6F5C",
        ledgerDark: "#14493D",
        stone: "#8A8F87",
        rust: "#B5493B",
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'ui-serif', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
