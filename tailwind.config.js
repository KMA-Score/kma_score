/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        catppuccin: {
          primary: "#8aadf4",
          secondary: "#f5bde6",
          accent: "#91d7e3",
          neutral: "#363a4f",
          "base-100": "#24273a",
          info: "#7dc4e4",
          success: "#a6da95",
          warning: "#f5a97f",
          error: "#ed8796",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@catppuccin/tailwindcss")({
      prefix: "ctp-",
      defaultFlavour: "macchiato",
    }),
  ],
};
