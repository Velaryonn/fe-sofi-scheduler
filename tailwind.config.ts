import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#4F46E5', // example primary color
        secondary: '#9CA3AF', // example secondary color
        heading: '#1E293B', // default color for h1
        paragraph: '#4B5563', // default color for p
      },
      spacing: {
        18: '4.5rem', // custom spacing for flexible layouts
        72: '18rem', // custom large spacing
      },
      fontSize: {
        'xxs': '0.65rem', // extra extra small font size
        'xxl': '2rem', // larger than usual font size
      },
      boxShadow: {
        'outline': '0 0 0 2px rgba(59, 130, 246, 0.5)', // subtle outline shadow
        'card': '0 10px 15px rgba(0, 0, 0, 0.1)', // softer card shadow
      },
      screens: {
        'xs': '480px', // custom small screen
        'lg': '1024px', // custom large screen
      },
      borderRadius: {
        '4xl': '2rem', // extra large border radius
      },
    },
  },
  plugins: [],
} satisfies Config;
