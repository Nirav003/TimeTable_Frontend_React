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
          1: "#00f9ff",
          2: "#00d7f6",
          3: "#ffffff",
          4: "#579eff",
          5: "#8cd9ff",
        },
        secondary: {
          1: "#74ffed",
          2: "#8bfff0",
          3: "#a1fff3",
          4: "#b0fff5",
          5: "#c3fff7",
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
