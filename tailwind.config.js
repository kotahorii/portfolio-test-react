module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        160: '40rem',
        116: '29rem',
      },
    },
    variants: {
      extend: { opacity: ['disabled'], cursor: ['disabled'] },
    },
    plugins: [],
  },
}
