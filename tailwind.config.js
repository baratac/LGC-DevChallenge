module.exports = {
  prefix: '',
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};

