/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#070F1E',     // Deep obsidian background
          light: '#FFFFFF',
        },
        secondary: {
          dark: '#0B1528',     // Section/Card background
          light: '#F8FAFC',
        },
        gold: {
          primary: '#DFB758',  // Matte Gold for CTAs and highlights
          light: '#FCD21D',    // Bright Gold for accents and icons
          dark: '#B08E3B',     // Darker gold for borders
        },
        accent: {
          blue: '#144F61',     // Dark teal/blue support color
          cyan: '#4EB7BD',     // original vibrant cyan accent
          red: '#EF4444',      // Urgencies
          green: '#00B300',    // Checkout / Success
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
