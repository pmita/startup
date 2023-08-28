/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colours: {
      transparent: 'transparent',
      'white': '#FFFFFF',
      'primary-black': '#1E1E1E',
      'secondary-black': '#2B2B2B',
      'primary-baige': '#FFF6EA',
      'action': '#7BB9FA',
      'grey-highlight': '#5F5F5F',
      'error': '#CE4C4C'
    },
    borderColor: theme => ({
      ...theme('colors'),
      'primary-black': '#1E1E1E',
    }),
    fontFamily: {
      'roboto': ["var(-roboto)", "sans-serif"],
      'poppins': ["var(--poppins)", "sans-serif"],
    },
    minHeight: {
      '10': '10vh'
    }
  },
  plugins: [],
}
