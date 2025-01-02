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
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary:colors.pink[600], // Tailwind's pink-600 // Your custom primary color
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

