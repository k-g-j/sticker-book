module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1.35rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '4rem',
    },
    extend: {
      fontFamily: {
        // Fancy Cursive
        'culpa': ['"Mea Culpa"', 'cursive'],
        // Brush Casual Cursive
        'brush': ['"Water Brush"', 'cursive'],
        // Handwritten Text 
        'hand': ['"Grape Nuts"', 'cursive']
      }
    },
  },
  plugins: [],
};
