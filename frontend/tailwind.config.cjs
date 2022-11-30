/** @type {import('tailwindcss').Config} */

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
      },
      fontWeight: {
      },
      colors: {
        primary: 'var(--color-primary)',
        'dark-1': 'var(--color-dark-1)',
        cancel: 'var(--color-cancel)',
        'dark-bg-1': 'var(--color-dark-bg-1)',
        'dark-bg-2': 'var(--color-dark-bg-2)',
        'text-dark-1': 'var(--color-text-dark-1)',
      },
      spacing: {},
      width: {},
      screens: {
        // md: { max: '1023px' },
      },
    },
  },
  plugins: [],
};
