/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        darkPrimary: "var(--dark-primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        beige: "var(--beige-color)"
      }
    },
  },
  plugins: [],
}

