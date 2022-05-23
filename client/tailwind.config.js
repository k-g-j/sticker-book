module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '1rem',
      'base': '1.35rem',
      'lg': '1.5rem',
      'xl': '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/images/woodtexture.jpeg')",
      },
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
