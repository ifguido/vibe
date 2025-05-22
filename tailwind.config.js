// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Importante para Vite
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#1976D2', // Un azul Material Design
          dark: '#004BA0',
        },
        secondary: {
          DEFAULT: '#FFC107', // Un amarillo Material Design
        },
        surface: '#FFFFFF',
        onSurface: '#000000',
        background: '#F5F5F5', // Un gris claro para el fondo
        danger: '#D32F2F',
        dangerHover: '#B71C1C',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Fuente estilo Material
      },
      boxShadow: {
        'md-elevation': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg-elevation': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl-elevation': '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}