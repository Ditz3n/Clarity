// filepath: /c:/Users/mvmad/Desktop/Clarity/tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' if you prefer
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'lg+': '1152px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
    },
  },
  plugins: [],
};