import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "#0F1120",
          light: "#171932",
          border: "#242645",
        },
        surface: {
          DEFAULT: "#F5F5FA",
          card: "#FFFFFF",
          border: "#E9E9F2",
        },
        brand: {
          50: "#F1EEFE",
          100: "#E3DEFD",
          300: "#B7A9FA",
          500: "#7C6CF0",
          600: "#6A57E8",
          700: "#5642C9",
        },
        ink: {
          DEFAULT: "#151726",
          soft: "#6B6D80",
          faint: "#9799AB",
        },
        good: "#1FAE73",
        warn: "#F2A93B",
        bad: "#EF5B5B",
        info: "#3E8BFF",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 20, 43, 0.04), 0 8px 24px -12px rgba(20, 20, 43, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
