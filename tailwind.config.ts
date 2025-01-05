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
          DEFAULT: "#FF69B4", // Hot pink
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFB6C1", // Light pink
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#FFD700", // Gold
          foreground: "#000000",
        },
        gift: {
          DEFAULT: "#FF1493", // Deep pink
          light: "#FFB6C1",   // Light pink
          dark: "#C71585",    // Medium violet red
        },
      },
      keyframes: {
        "gift-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gift-wrap": {
          "0%": { transform: "scale(0) rotate(0deg)" },
          "100%": { transform: "scale(1) rotate(360deg)" },
        },
        "sparkle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "gift-bounce": "gift-bounce 2s ease-in-out infinite",
        "gift-wrap": "gift-wrap 0.5s ease-out forwards",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;