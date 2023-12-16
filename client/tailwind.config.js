/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonColor: "#565564",
        buttonHover: "#626273",
        buttonTextColor: "#ED7138",
      },
    },
  },

  plugins: [],
};
