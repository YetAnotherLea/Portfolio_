/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFFDFA",
        primary: "#1B1B1B",
        secondary: "#63FF90",
      },
      fontFamily: {
        title: ["Kantumruy Pro", "sans-serif"],
        text: ["Sora", "serif"],
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
