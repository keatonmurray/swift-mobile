/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        lime: "#D9FF43",
        "lime-soft": "rgba(217,255,67,0.08)",
        "main-bg": "#000000",
        "white-72": "rgba(255,255,255,0.72)",
        "white-60": "rgba(255,255,255,0.60)",
        "white-55": "rgba(255,255,255,0.55)",
        "white-50": "rgba(255,255,255,0.50)",
        "white-45": "rgba(255,255,255,0.45)",
        "white-40": "rgba(255,255,255,0.40)",
        "white-35": "rgba(255,255,255,0.35)",
        "white-30": "rgba(255,255,255,0.30)",
        "glass-bg": "rgba(255,255,255,0.03)",
        "glass-border": "rgba(255,255,255,0.08)",
        "input-bg": "rgba(255,255,255,0.05)",
        "input-border": "rgba(255,255,255,0.1)",
        "success": "#14D19B",
      },
      fontFamily: {
        inter: ["Inter"],
      },
      borderRadius: {
        "20": "20px",
        "24": "24px",
        "26": "26px",
        "28": "28px",
      },
    },
  },
  plugins: [],
};
