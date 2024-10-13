/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        desktop: '1140px',
      },
      animation: {
        opening: 'opening ease-in .2s forwards',
        jump: 'jump .3s ease-in-out forwards',
      },
      keyframes: {
        opening: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        jump: {
          '0%': {
            transform: 'scale(0%)',
          },
          '80%': {
            transform: 'scale(105%)',
          },
          '100%': {
            transform: 'scale(100%)',
          },
        },
      },
    },
  },
  plugins: [],
}
