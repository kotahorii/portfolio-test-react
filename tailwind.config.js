module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      spacing: {
        160: '40rem',
        116: '29rem',
        192: '48rem',
      },
    },
  },
  variants: {
    extend: { opacity: ['disabled'], cursor: ['disabled'] },
  },
  plugins: [],
}
