/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tag-sweep': '#3B82F6',      // Blue
        'tag-submission': '#EF4444',  // Red
        'tag-pass': '#10B981',        // Green
        'tag-escape': '#F59E0B',      // Yellow/Amber
        'tag-transition': '#8B5CF6',  // Purple
      },
    },
  },
  plugins: [],
}
