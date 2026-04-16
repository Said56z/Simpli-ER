/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'page-bg': '#F2E1D8',
        'text-primary': '#285059',
        'accent-red': '#73142D',
        'accent-red-dark': '#400A0A',
        'input-bg': '#D3D3D3',
        'header-initial': '#FFF1EA',
        'header-scrolled': '#285059',
      },
      fontFamily: {
        // Asegúrate de importar estas fuentes en tu index.css
        principal: ['"Iosevka Charon"', 'ui-monospace', 'monospace'],
        logo: ['"Jersey 15"', 'serif'],
      },
    },
  },
  plugins: [],
}