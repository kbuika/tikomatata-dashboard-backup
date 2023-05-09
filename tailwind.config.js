/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    // Path to the tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F28500",
        secondary: "#54318C",
        success: "#37356A2",
        successBg: "#F5EFFF",
        criticalRed: "#EA2419",
        criticalBg: "#FFEFEE",
        pending: "#ADD8E6",
        pendingBg: "#E9FAFF",
        neutralWhite: "#F2F2F2",
        white: "#FFFFFF",
        neutralDark: "#171412",
        neutralGray: "#595959",
        navBar: "#FFFCEE",
      },
    },

    ringColor: {
      DEFAULT: "#F28500",
    },
    borderColor: {
      primary: "#F28500",
      neutralDark: "#171412",
    },
  },
  plugins: [],
}
