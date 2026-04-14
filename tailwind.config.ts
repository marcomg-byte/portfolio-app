import type { Config } from 'tailwindcss';

const config: Config = {
  prefix: 'mg-',
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
    },
  },
  plugins: [],
};

export default config;
