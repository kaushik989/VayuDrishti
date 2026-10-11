/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aws: {
          orange: '#FF9900',
          blue: '#146EB4',
          dark: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          amber: '#F59E0B',
        },
        aqi: {
          good: '#10B981',       // 0-50
          moderate: '#F59E0B',   // 51-100
          poor: '#F97316',       // 101-200
          veryPoor: '#EF4444',   // 201-300
          severe: '#7F1D1D',     // 301-400
          hazardous: '#4C0519',  // 401+
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
