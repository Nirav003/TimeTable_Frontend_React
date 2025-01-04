/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#f5e7e4",
          light: "#e4f2f5",
          dark: "#e0b5ac",
        },
        secondary: {
          default: "#fbf3df",
          light: "#e3f2dd",
          dark: "#eadaf5",
        },
        offwhite: {
          light: "#fffef6",
          dark: "#fffdef"
        },
        test: {
          1: "#ffccdd",
          2: "#ff99bb",
          3: "#ff6699",
          4: "#ff3377",
          5: "#ff0055",
        },
        test2: {
          1: "#1200ff",
          2: "#5548ff",
          3: "#7a70ff",
          4: "#9d96ff",
          5: "#c1bcff",
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

