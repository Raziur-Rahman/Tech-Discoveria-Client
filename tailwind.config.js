/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'logInBg': "url('/src/assets/authentication.png')"
      }
    },
  },
  plugins: [require("daisyui")],
}

