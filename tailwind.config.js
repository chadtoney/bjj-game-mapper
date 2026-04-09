/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tag-sweep': '#93C5FD',        // Light Blue
        'tag-submission': '#FCA5A5',    // Light Red
        'tag-pass': '#C4B5FD',          // Light Purple
        'tag-escape': '#FDE68A',        // Light Yellow
        'tag-transition': '#D1D5DB',    // Light Gray
        'tag-position': '#6EE7B7',      // Light Green
        'tag-takedown': '#FDBA74',      // Light Orange
      },
    },
  },
  plugins: [],
}
