/** @type {import('tailwindcss').Config} */

// const plugin = require("tailwindcss/plugin");
// const withMT = require("@material-tailwind/react/utils/withMT");

import plugin from "tailwindcss/plugin";
import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant("sidebar-expanded", ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) =>
            `.sidebar-expanded .${e(
              `sidebar-expanded${separator}${className}`
            )}`
        );
      });
    }),
  ],
});

export default config;
