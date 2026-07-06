/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm, food-focused light palette
        gold: {
          DEFAULT: '#D4A017',
          dark: '#B8860B',
          light: '#E8B93A',
        },
        brown: {
          DEFAULT: '#8B4513',
          dark: '#6B3410',
          light: '#A85A2A',
        },
        cream: '#F8F5F0',
        beige: '#FFF8F0',
        ink: '#1A1A1A',
        muted: '#6B6B6B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Soft, neutral shadows — no colored glow
        soft: '0 4px 20px rgba(26,26,26,0.06)',
        card: '0 10px 30px rgba(26,26,26,0.08)',
        'card-hover': '0 18px 45px rgba(26,26,26,0.14)',
        btn: '0 6px 16px rgba(212,160,23,0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
