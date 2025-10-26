/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    theme: {
      extend: {
        animation: {
          'rotate-3d': 'rotate-3d 8s linear infinite',
        },
        keyframes: {
          'rotate-3d': {
            '0%': { transform: 'rotateX(-20deg) rotateY(0deg)' },
            '100%': { transform: 'rotateX(-20deg) rotateY(360deg)' },
          },
        },
      },
    },
  },
  plugins: [],
  // This ensures the styles are scoped to your components
  corePlugins: {
    preflight: false,
  },
}