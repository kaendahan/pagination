
import color from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: color.red[700],
          light: color.blue[50],
          emphasis: color.white,
        },
        secondary: {
          DEFAULT: color.gray[800],
          emphasis: color.white,
        },
        gray: {
          DEFAULT: color.gray[700],
          subtle: color.gray[400],
        },
      },
    },
  },
  plugins: [],
};
