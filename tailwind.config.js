/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[class="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
