/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bond Brand Colors
        coffee: {
          50: '#faf8f5',
          100: '#f5f3f0', // Cream background
          200: '#e8e2db',
          300: '#d4c8bb',
          400: '#b8a595',
          500: '#9d8674',
          600: '#8b7355',
          700: '#6b5940',
          800: '#3c2415', // Coffee brown primary
          900: '#2d1b0f',
        },
        primary: '#3c2415', // Coffee brown
        secondary: '#f5f3f0', // Cream
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'progress-fill': 'progressFill 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'shine': 'shine 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}