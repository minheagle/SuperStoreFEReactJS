/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  variants: {
    display: ["group-hover"],
  },
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            ".text-ellipsis-customs": {
              display: "-webkit-box",
              "-webkit-line-clamp": 3, // Số dòng tối đa trước khi hiển thị dấu "..."
              "-webkit-box-orient": "vertical",
              overflow: "hidden",
            },
          },
        },
      },
      spacing: {
        100: "25rem",
        128: "32rem",
        160: "40rem",
        200: "50rem",
      },
      colors: {
        primary: "#fa541c",
      },
      width: {
        "with-navbar": "calc(100% - 192px)",
      },
      height: {
        "without-header-24-rem": "calc(100vh - 96px)",
      },
      padding: {},
    },
  },
  plugins: [],
};
