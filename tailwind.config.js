/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      colors: {
        'navy': '#0A1128',
        'royal': '#1B3B6F',
        'deep-purple': '#2E004F',
        'glass': 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to bottom right, #0A1128, #1B3B6F, #2E004F, #000000)',
      },
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.04em',
      }
    },
  },
  plugins: [],
}
