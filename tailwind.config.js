/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "n-light": "netflix-light",
        "n-medium": "netflix-medium",
        "n-bold": "netflix-bold",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
