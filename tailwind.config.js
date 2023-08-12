/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts}",
    // "./src/*.svelte",
  ],
  theme: {
    extend: {
      boxShadow: {
        'main': '0 2px 4px 0 rgba(0, 0, 0, 0.2),0 25px 50px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

