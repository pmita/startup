const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(250px, 350px)',
        'auto-fill': 'repeat(auto-fill, minmax(250px, 350px)',
        '4-cols': 'repeat(4, minmax(0, 1fr))',
        '3-cols': 'repeat(3, minmax(0, 1fr))',
        '2-cols': 'repeat(2, minmax(0, 1fr))',
        
      },
    fontFamily: {
      roboto: ["var(--font-roboto)", ...fontFamily.sans],
      poppins: ["var(--font-poppins)", ...fontFamily.sans],
    },
    colors: {
      transparent: 'transparent',
      'primary-white': '#FFFFFF',
      'primary-black': '#1E1E1E',
      'secondary-black': '#2B2B2B',
      'primary-baige': '#FFF6EA',
      'primary-blue': '#7BB9FA',
      'primary-grey': '#5F5F5F',
      'primary-error': '#CE4C4C',
    },
    keyframes: {
      left: {
        '0%, 100%': { transform: 'rotateZ(10deg)' },
        '50%': { transform: 'rotateZ(-15deg)' },
      },
      right: {
        '0%, 100%': { transform: 'rotateZ(-10deg)' },
        '50%': { transform: 'rotateZ(15deg)' },
      },
    },
    animation: {
      rotateLeft: 'left 9s ease-in-out infinite',
      rotateRight: 'right 9s ease-in-out infinite',
    },
    borderColor: theme => ({
      ...theme('colors'),
      'primary-black': '#1E1E1E',
    }),
    minHeight: {
      '10': '10vh'
    }
  },
  plugins: [],
  }
};