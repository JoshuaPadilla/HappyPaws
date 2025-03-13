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
          100: "#191D31",
          200: "#666876",
          300: "#8C8E98",
        },
        danger: "#F75555",
      },
    },
  },
  plugins: [],
};
