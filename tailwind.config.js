/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      noto: ["Noto Sans", "sans-serif"],
    },
    extend: {
      screens: {
        sm: "600px",
        md: "905px",
        lg: "1240px",
        xl: "1440px",
      },
      colors: {
        'primary': 'var(--md-sys-color-primary)',
        'surface': 'var(--md-sys-color-surface)',
        'surface-container': 'var(--md-sys-color-surface-container)',
        'on-surface': 'var(--md-sys-color-on-surface)',
        'on-surface-variant': 'var(--md-sys-color-on-surface-variant)',
        'error': 'var(--md-sys-color-error)',
        'error-container': 'var(--md-sys-color-error-container)',
        'on-error-container': 'var(--md-sys-color-on-error-container)',
        'outline': 'var(--md-sys-color-outline)'
      },
      boxShadow: {
        none: "0px 0px 0px 0px rgba(0, 0, 0, 0.1)",
        xs: "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
        sm: "0px 4px 20px 0px rgba(0, 0, 0, 0.1)",
        md: "0px 4px 30px 0px rgba(0, 0, 0, 0.1)",
        lg: "0px 4px 40px 0px rgba(0, 0, 0, 0.1)",
        xl: "0px 4px 50px 0px rgba(0, 0, 0, 0.1)",
      },
      borderWidth: {
        0: "0px",
        1: "1px",
        2: "2px",
      },
      transitionProperty: {
        radius: "border-radius",
        icon: "font-variation-settings",
      },
    },
  },
  plugins: [],
};
