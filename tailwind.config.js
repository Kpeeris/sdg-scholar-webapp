/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        genieOpen: {
          //start position
          "0%": {
            transform: "scale(0.5) translate(0,10%)",
            opacity: "0",
            transformOrigin: "top left",
          },
          "50%": { opacity: "1" },
          //end position
          "100%": {
            transform: "scale(1) translate(50%, 50%)",
            transformOrigin: "top left",
          },
        },
        genieClose: {
          "0%": {
            transform: "scale(1) translate(50%, 50%)",
            opacity: "1",
            transformOrigin: "top left",
          },
          "50%": { opacity: "1" },
          "100%": {
            transform: "scale(0) translate(10%,10%)",
            opacity: "0",
            transformOrigin: "top left",
          },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        genieOpen: "genieOpen 0.5s ease-out forwards",
        genieClose: "genieClose 0.5s ease-in forwards",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(0deg, rgba(135, 206, 235, 0.25) 0%, rgba(76, 117, 133, 0.00) 47.5%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
