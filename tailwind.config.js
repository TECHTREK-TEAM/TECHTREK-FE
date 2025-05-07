/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#123123'
      } // 이 부분은 tailwindcss custom test를 위한 코드
    },
  },
  plugins: [],
}