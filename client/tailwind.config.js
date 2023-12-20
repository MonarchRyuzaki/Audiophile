/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#d87d4a",
        primary: "#fafafa",
        gray: "#fafafa80", // on black background
        dimGray: "#10101080", // on white background 
        black: "#101010",
        lightGray: "#f1f1f1"
      },
      screens: {
        xs: "440px",
      }
    },
  },
  plugins: [],
}