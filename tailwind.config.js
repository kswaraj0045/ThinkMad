/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          lavender: '#E9E4F5',
          'lavender-dark': '#8E7DBE',
          'lavender-light': '#F5F2FB',
          pink: '#FFE5EC',
          'pink-hover': '#FFD1DC',
          'pink-deep': '#FF758F',
          cream: '#FFFDF9',
          purple: '#D3C5E5',
          'purple-accent': '#735DA5',
          mint: '#D8F3DC',
          peach: '#FFE5D9',
          yellow: '#FFF3B0',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(142, 125, 190, 0.12)',
        'soft-lg': '0 15px 35px rgba(142, 125, 190, 0.18)',
        'glow-pink': '0 0 25px rgba(255, 117, 143, 0.35)',
        'glow-purple': '0 0 25px rgba(115, 93, 165, 0.3)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.9' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
