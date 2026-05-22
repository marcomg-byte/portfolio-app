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
        'slide-in-top': 'slide-in-top 0.5s ease-out both',
        'slide-in-bottom': 'slide-in-bottom 0.5s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'rocket-fly': 'rocket-fly 3s ease-in-out infinite',
        'particle-float': 'particle-float 3s ease-in-out infinite',
        'particle-drift': 'particle-drift 4.5s ease-in-out infinite',
      },
      keyframes: {
        'spin-in': {
          from: { transform: 'rotate(-180deg)', opacity: '0' },
          to: { transform: 'rotate(0deg)', opacity: '1' },
        },
        'rocket-fly': {
          '0%': { transform: 'translate(0px,   0px)   rotate(0deg)' },
          '15%': { transform: 'translate(3px,  -4px)   rotate(-2deg)' },
          '30%': { transform: 'translate(7px,  -6px)   rotate(2deg)' },
          '45%': { transform: 'translate(11px, -11px)  rotate(-1deg)' },
          '50%': { transform: 'translate(14px, -14px)  rotate(0deg)' },
          '60%': { transform: 'translate(12px, -12px)  rotate(1deg)' },
          '72%': { transform: 'translate(8px,  -9px)   rotate(-2deg)' },
          '85%': { transform: 'translate(4px,  -5px)   rotate(2deg)' },
          '100%': { transform: 'translate(0px,   0px)   rotate(0deg)' },
        },
        'particle-float': {
          '0%': { transform: 'translate(0px,   0px)', opacity: '0.7' },
          '25%': { transform: 'translate(6px,  -9px)', opacity: '1.0' },
          '50%': { transform: 'translate(12px,  0px)', opacity: '0.5' },
          '75%': { transform: 'translate(5px,   8px)', opacity: '0.9' },
          '100%': { transform: 'translate(0px,   0px)', opacity: '0.7' },
        },
        'particle-drift': {
          '0%': { transform: 'translate(0px,   0px)', opacity: '0.5' },
          '35%': { transform: 'translate(-7px, -11px)', opacity: '0.9' },
          '65%': { transform: 'translate(-4px,  7px)', opacity: '0.4' },
          '100%': { transform: 'translate(0px,   0px)', opacity: '0.5' },
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
        'slide-in-top': {
          from: { transform: 'translateY(6px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-bottom': {
          from: { transform: 'translateY(-6px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
