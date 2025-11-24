/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F3F4F6",
        primary: "#1D4ED8",
        secondary: "#9333EA",
      },
      fontFamily: {
        title: ["Poppins", "sans-serif"],
        text: ["Inter", "sans-serif"],
      },
      spacing: {
        page: "1440px",
      },
    },
    screens: {
    xs: "420px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1536px",
  },
  },
  plugins: [],
};
