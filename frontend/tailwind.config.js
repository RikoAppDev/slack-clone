/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}', // Add your files for Tailwind to scan
  ],
  theme: {
    extend: {
      colors: {
        primary: '#320a35',
      }
    },
  },
  plugins: [],
};
