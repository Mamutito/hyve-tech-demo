/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#419DB4",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#8B9CA1",
          foreground: "#FFFFFF",
        },
        background: "#FFFFFF",
        foreground: "#2A2A2A",
        muted: {
          DEFAULT: "#8B9CA1",
          foreground: "#6B7280",
        },
        accent: {
          DEFAULT: "#419DB4",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#2A2A2A",
          foreground: "#FFFFFF",
        },
        border: "#8B9CA1",
        input: "#8B9CA1",
        ring: "#419DB4",
      },
    },
  },
  plugins: [],
};
