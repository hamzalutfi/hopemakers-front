// tailwind.config.js
import image from "./public/bg.jpg"
module.exports = {
  darkMode: 'class', // Enables manual dark mode switching using the `dark` class
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Your file paths
  ],
  theme: {
    extend: {
      colors: {
        darkPrimary: '#121212',
        darkSecondary: '#1F2937',
        darkTextPrimary: '#E5E7EB',
        darkTextSecondary: '#9CA3AF',
        primaryAccent: '#3B82F6',
        hoverAccent: '#60A5FA',
        darkBorder: '#374151',
        error: '#EF4444',
        success: '#10B981',
      },
      boxShadow: {
                'custom': '2px 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            },
            backgroundImage: {
        'hero-pattern': "url('/public/bg.jpg')",
      },
    },
  },
  plugins: [],
};
