/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif']
    },
    extend: {
      boxShadow: {
        '0': '0px 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 0px rgba(0, 0, 0, 0.1)',
        '1': '0px 1px 2px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 1px rgba(0, 0, 0, 0.1)',
        '2': '0px 1px 2px 0px rgba(0, 0, 0, 0.1), 0px 2px 6px 2px rgba(0, 0, 0, 0.1)',
        '3': '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 4px 8px 3px rgba(0, 0, 0, 0.1)',
        '4': '0px 2px 3px 0px rgba(0, 0, 0, 0.1), 0px 6px 10px 4px rgba(0, 0, 0, 0.1)',
        '5': '0px 4px 4px 0px rgba(0, 0, 0, 0.1), 0px 8px 12px 6px rgba(0, 0, 0, 0.1)',
      }
    }
  },
  plugins: [],
}
