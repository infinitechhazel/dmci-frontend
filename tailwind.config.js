import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },

  darkMode: "class",

  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            default: {
              50: "#FFFFFF",
              100: "#F5F5F5",
              200: "#E5E5E5",
              300: "#D4D4D4",
              400: "#A3A3A3",
              500: "#737373",
              600: "#525252",
              700: "#404040",
              800: "#373A36",
              900: "#373A36",
              950: "#1F211F",
            },

            primary: {
              DEFAULT: "#9B0D15",
              foreground: "#FFFFFF",
            },

            background: "#FFFFFF",
            foreground: "#373A36",
          },
        },

        dark: {
          colors: {
            default: {
              50: "#1F211F",
              100: "#252725",
              200: "#2C2E2C",
              300: "#373A36",
              400: "#525252",
              500: "#737373",
              600: "#A3A3A3",
              700: "#D4D4D4",
              800: "#E5E5E5",
              900: "#FFFFFF",
              950: "#FFFFFF",
            },

            primary: {
              DEFAULT: "#9B0D15",
              foreground: "#FFFFFF",
            },

            background: "#373A36",
            foreground: "#FFFFFF",
          },
        },
      },
    }),
  ],
}

export default config
