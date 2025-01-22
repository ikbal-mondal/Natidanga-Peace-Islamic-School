// eslint-disable-next-line no-unused-vars
import daisyui from 'daisyui';
// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077B5",  // Your custom primary color
        focusInput: colors.sky[200], // Add focusInput to Tailwind's color palette
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0077B5",  // Your custom primary color
          primary_content:colors.pink[400], // Tailwind's pink-400 
          
          secondary: "#F43F5E", // Your custom secondary color
          accent: "#37CDBE", // Optional accent color
          neutral: "#3D4451", // Optional neutral color
          "base-100": "#FFFFFF", // Background color
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      "light"
    ],
  },
}

