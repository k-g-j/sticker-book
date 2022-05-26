module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      'tiny': '.75rem',
      'xs': '.875rem',
      'sm': '1rem',
      'base': '1.35rem',
      'lg': '1.5rem',
      'xl': '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
    extend: {
      // Wooden Background across all pages except where it says seperately
      backgroundImage: {
        'hero': "url('/src/assets/images/woodtexture.jpeg')"
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
