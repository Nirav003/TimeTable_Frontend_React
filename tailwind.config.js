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
        }
      }
    },
  },
  plugins: [],
}