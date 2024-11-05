import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'lg': '1330px',
        'sm': '560px'
        // => @media (min-width: 992px) { ... }
      },
      width: {
        '128': '32rem',
      },
      height: {
        '132': '38rem',
      }
    },
  },
  plugins: [],
};
export default config;
