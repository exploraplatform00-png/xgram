/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        xgram: {
          purple: '#833AB4',
          pink: '#E1306C',
          orange: '#F77737',
          gradient: 'linear-gradient(45deg, #833AB4, #E1306C, #F77737)'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
}
