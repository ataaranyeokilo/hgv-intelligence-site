import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fleetSignal: {
          DEFAULT: "#2563EB",
        },
      },
      boxShadow: {
        soft: "0 1px 3px rgba(1, 5, 18, 0.08)",
        card: "0 2px 8px rgba(1, 5, 18, 0.10), 0 1px 2px rgba(1, 5, 18, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
