module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'apple-black': '#000000',
        'apple-white': '#FFFFFF',
        'apple-blue': '#007AFF',
      },
      fontFamily: {
        'sf-pro-display': ['SF Pro Display', 'sans-serif'],
        'sf-pro-text': ['SF Pro Text', 'sans-serif'],
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      scrollSnapType: {
        y: 'y',
        mandatory: 'mandatory',
      },
    },
  },
  variants: {
    extend: {
      scrollSnapType: ['responsive'],
    },
  },
  plugins: [],
}
