/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        'bauhaus-bg': '#F0F0F0',
        'bauhaus-fg': '#121212',
        'bauhaus-red': '#D02020',
        'bauhaus-blue': '#1040C0',
        'bauhaus-yellow': '#F0C020',
        'bauhaus-muted': '#E0E0E0',
      },
      boxShadow: {
        'bauhaus-sm': '3px 3px 0px 0px black',
        'bauhaus-md': '4px 4px 0px 0px black',
        'bauhaus-lg': '6px 6px 0px 0px black',
        'bauhaus-xl': '8px 8px 0px 0px black',
      },
      animation: {
        'bauhaus-press': 'bauhausPulse 0.2s ease-out',
      },
      keyframes: {
        bauhausPulse: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(2px, 2px)' },
        },
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        widest: '0.15em',
      },
    },
  },
  plugins: [],
}
