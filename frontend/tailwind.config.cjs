/** @type {import('tailwindcss').Config} */

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {},
      colors: {},
      spacing: {},
      width: {},
      screens: {
        // md: { max: '1023px' },
      },
    },
  },
  plugins: [],
};
