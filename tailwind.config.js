/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gutenBlue: '#5E56E7',
        gutenWhite: '#F8F7FF',
        gutenLightGrey: '#F0F0F6',
        gutenDarkGrey: '#A0A0A0',
        gutenBlack: '#333333',
      },
      fontSize:{
        extraSmall:'12px',
        small:'16px',
        medium:'20px',
        large:'30px',
        extraLarge:'48px',
      },
    },
  },
  plugins: [],
};