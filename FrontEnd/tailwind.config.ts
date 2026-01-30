import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2F9A48",
          foreground: "#FFFFFF",
          50: "#E8F5EC",
          100: "#D1EBD9",
          200: "#A7D7A9",
          300: "#7DC37F",
          400: "#53AF55",
          500: "#2F9A48",
          600: "#267B3A",
          700: "#1F6A32",
          800: "#185229",
          900: "#113B1F",
        },
        secondary: {
          DEFAULT: "#F3C623",
          foreground: "#333333",
          50: "#FEF9E7",
          100: "#FDF3CF",
          200: "#FBE79F",
          300: "#F9DB6F",
          400: "#F7CF3F",
          500: "#F3C623",
          600: "#C29E1C",
          700: "#917715",
          800: "#614F0E",
          900: "#302807",
        },
        natural: {
          DEFAULT: "#F2F2EA",
          foreground: "#333333",
        },
        forest: {
          DEFAULT: "#1F6A32",
          foreground: "#FFFFFF",
        },
        mint: {
          DEFAULT: "#A7D7A9",
          foreground: "#333333",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F4F4F4",
          foreground: "#333333",
        },
        accent: {
          DEFAULT: "#A7D7A9",
          foreground: "#333333",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["Inter", "Lato", "system-ui", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;