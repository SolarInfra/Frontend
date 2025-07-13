/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },

    screens: {
    'sm1': '400px',
    'sm2': '450px',
    'sm3': '500px',
    'sm4': '640px',
    'sm5': '620px',
    'sm6': '460px',
    'sm7': '550px',
    'sm8': '590px',
    'sm9': '530px',
    'md1': '800px',
    'md2': '570px',
    'md3': '700px',
    'md4': '940px',
    'md5': '880px',
    'md6': '820px',
    'md7': '770px',
    'md8': '920px',
    'lg1': '1070px',
    'lg2': '1120px',
    'lg3': '1170px',
    'xl1': '1370px',
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}