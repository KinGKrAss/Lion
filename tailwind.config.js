module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gold': {
          '50': '#fef9f0',
          '100': '#fdf2de',
          '200': '#fae4bd',
          '300': '#f5cd7a',
          '400': '#f0b649',
          '500': '#e89b2d',
          '600': '#d67d24',
          '700': '#b35c1f',
          '800': '#8f4820',
          '900': '#743c1f',
        },
        'royal': {
          'black': '#050505',
          'dark': '#0d0d0f',
          'dark-2': '#151515',
        },
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f0b649, #d67d24)',
      },
    },
  },
  plugins: [],
};
