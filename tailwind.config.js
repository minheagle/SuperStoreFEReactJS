/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fa541c",
      },
      width: {
        "with-navbar": "calc(100% - 192px)",
      },
      padding: {},
    },
  },
  plugins: [],
};
