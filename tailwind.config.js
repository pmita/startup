/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
