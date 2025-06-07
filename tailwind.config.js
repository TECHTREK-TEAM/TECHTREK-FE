/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        primary: '#111111',
        customgray: '#767676',
        brandcolor: '#5f43ff',
        gradientColor: '#AC83FF',
      },
      fontSize: {
        contentsize1: '16px',
        contentsize2: '20px',
        subtitlesize: '32px',
        logosize: '24px',
      },
      lineHeight: {
        custom: '1.4', // 140%
      },
      letterSpacing: {
        custom: '-0.025em', // -2.5%
      },
    },
  },
  plugins: [],
};
