import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,ts}",
    "./node_modules/flowbite-react/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [nextui(), require("flowbite/plugin")],
};
export default config;
