/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files inside the `app` directory
    "./components/**/*.{js,ts,jsx,tsx}", // If you have a `components` folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
