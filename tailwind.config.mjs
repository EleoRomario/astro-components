/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {},
      backgroundImage: {
        svg: "conic-gradient(from 280deg, currentColor 6%, transparent 14%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
