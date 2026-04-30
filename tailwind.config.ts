import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter Body', 'sans-serif'],
        heading: ['Inter Heading', 'sans-serif'],
        bold: ['Inter Bold', 'sans-serif'],
      },
      animation: {
        'spin-in': 'spin-in 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out 0.3s both',
        'slide-in-right': 'slide-in-right 0.5s ease-out 0.3s both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
      keyframes: {
        'spin-in': {
          from: { transform: 'rotate(-180deg)', opacity: '0' },
          to: { transform: 'rotate(0deg)', opacity: '1' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-48px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(48px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
