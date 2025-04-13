/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
        "poppins-extrabold": ["Poppins-ExtraBold", "sans-serif"],
        "poppins-light": ["Poppins-Light", "sans-serif"],
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
        "poppins-regular": ["Poppins-Regular", "sans-serif"],
        "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-regular": ["Rubik-Regular", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#73C7C7",
          200: "#53A9A9",
          300: "#3373C7C7",
        },
        accent: {
          100: "#F6F4F0",
          200: "#FFCFEF",
          300: "#F7CFD8",
        },
        background: {
          100: "#F5F5F5",
        },
        black: {
          100: "#1E1E1E",
          200: "#4D4D4D",
          300: "#8C8E98",
          400: "#E5E5E5",
        },
        danger: "#F75555",
        base: {
          vaccine: "#A2D5F2",
          groom: "#B2F2BB",
          dental: "#E6E6FA",
          checkup: "#FFDAB9",
          medication: "#FFC0CB",
          wound: "#FFFACD",
          diet: "#F4A460",
          followup: "#C1E1C1",
        },
        dark: {
          vaccine: "#6FA8C9",
          groom: "#7FC987",
          dental: "#B3A8D8",
          checkup: "#D4A276",
          medication: "#D88E9B",
          wound: "#D9D48E",
          diet: "#C77D3E",
          followup: "#8FB88F",
        },
        trend: {
          up: "#2fdd92",
          down: "#ff5757",
        },

        "base-medication": "#FFC0CB", // Light pink
        "base-wound": "#FFFACD", // Light yellow
        "base-diet": "#F4A460", // Sandy brown
        "base-follow": "#C1E1C1", // Light green
        "base-vaccine": "#A2D5F2", // Light blue
        "base-groom": "#B2F2BB", // Light mint
        "base-dental": "#E6E6FA", // Light purple
        "base-checkup": "#FFDAB9", // Peach
        "dark-medication": "#D88E9B", // Dark pink
        "dark-wound": "#D9D48E", // Dark yellow
        "dark-diet": "#C77D3E", // Dark brown
        "dark-follow": "#8FB88F", // Dark green
        "dark-vaccine": "#6FA8C9", // Dark blue
        "dark-groom": "#7FC987", // Dark mint
        "dark-dental": "#B3A8D8", // Dark purple
        "dark-checkup": "#D4A276", // Dark peach

        insights: {
          total: "#B8B5FF",
          completed: "#B9F6CA",
          cancelled: "#FF8A80",
          most: "#64B5F6",
          resched: "#FFD54F",
        },
      },
    },
  },
  plugins: [],
};
