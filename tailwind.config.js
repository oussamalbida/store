/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'dark-text': '#ffffff',
        'dark-border': '#2d2d2d',
      },
      backgroundColor: {
        'dark-hover': '#2d2d2d',
      }
    },
  },
  plugins: [],
}
