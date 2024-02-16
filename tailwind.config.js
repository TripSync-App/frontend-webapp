/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@rewind-ui/core/dist/theme/styles/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        "protest": ['Protest Strike', 'sans']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        logoGreen: "#138926",
        logoBlue: "#0779fc",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animated"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
