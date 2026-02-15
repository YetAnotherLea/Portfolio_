import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFDFA",
        foreground: "#4E4A40",
        //Couleurs que je sais pas si j'utilise ou non
        primary: "#63FF90", // Vert
        secondary: "#FF63DB", // Rose
        accent1: "#FF9263", // Orange
        accent2: "#AC63FF", // Violet
      },
      fontFamily: {
        sans: ['var(--font-sora)'],
        body: ['var(--font-kantumruy)'],
      },
      
    },
  },
  plugins: [],
};
export default config;