/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce': 'bounce 1.4s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 80%, 100%': {
            transform: 'scale(0)',
          },
          '40%': {
            transform: 'scale(1.0)',
          },
        },
      },
    },
  },
  plugins: [],
};