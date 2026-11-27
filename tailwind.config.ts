import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      "colors": {
        "primary": "#ad0004",
        "on-primary-container": "#ffebe8",
        "on-primary-fixed": "#410000",
        "surface-variant": "#e3e1ec",
        "outline": "#936e69",
        "background": "#fbf8ff",
        "surface-dim": "#dad9e3",
        "on-secondary-container": "#656466",
        "on-error-container": "#93000a",
        "on-surface-variant": "#5e3f3a",
        "surface": "#fbf8ff",
        "on-tertiary-fixed": "#261900",
        "outline-variant": "#e8bcb6",
        "surface-container-lowest": "#ffffff",
        "secondary": "#5f5e60",
        "inverse-primary": "#ffb4a9",
        "surface-tint": "#c00005",
        "secondary-container": "#e5e1e4",
        "tertiary-fixed-dim": "#e3c286",
        "error": "#ba1a1a",
        "tertiary-fixed": "#ffdea4",
        "on-secondary-fixed-variant": "#474649",
        "secondary-fixed-dim": "#c8c6c8",
        "surface-container-high": "#e8e7f1",
        "error-container": "#ffdad6",
        "on-secondary": "#ffffff",
        "surface-container-low": "#f4f2fd",
        "tertiary": "#695120",
        "surface-container-highest": "#e3e1ec",
        "tertiary-container": "#836936",
        "on-tertiary-container": "#ffedd3",
        "inverse-on-surface": "#f1effa",
        "on-primary": "#ffffff",
        "on-tertiary-fixed-variant": "#594313",
        "on-tertiary": "#ffffff",
        "surface-container": "#eeedf7",
        "primary-fixed": "#ffdad5",
        "inverse-surface": "#2f3038",
        "on-secondary-fixed": "#1b1b1d",
        "secondary-fixed": "#e5e1e4",
        "surface-bright": "#fbf8ff",
        "on-error": "#ffffff",
        "on-primary-fixed-variant": "#930003",
        "primary-fixed-dim": "#ffb4a9",
        "on-background": "#1a1b22",
        "primary-container": "#db0007",
        "on-surface": "#1a1b22",
        "arsenal": {
          "red": "#DB0007",
          "darkred": "#9C0006",
          "gold": "#D1A153",
          "champagne": "#E8D49E",
          "navy": "#021B32",
          "gunner": "#0B131F"
        },
        "naija": {
          "green": "#008751",
          "lightgreen": "#00A86B"
        }
      },
      "borderRadius": {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      "spacing": {
        "gutter": "1rem",
        "margin": "1rem",
        "margin-tablet": "2rem",
        "gutter-tablet": "1.25rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "space-xs": "0.25rem",
        "space-md": "1rem",
        "margin-desktop": "3rem",
        "gutter-desktop": "1.5rem",
        "space-sm": "0.5rem"
      },
      "fontFamily": {
        "headline-md": [
          "Space Grotesk"
        ],
        "headline-xl": [
          "Space Grotesk"
        ],
        "body-lg": [
          "Plus Jakarta Sans"
        ],
        "label-md": [
          "Plus Jakarta Sans"
        ],
        "body-md": [
          "Plus Jakarta Sans"
        ],
        "label-sm": [
          "Plus Jakarta Sans"
        ],
        "headline-lg": [
          "Space Grotesk"
        ],
        "body-sm": [
          "Plus Jakarta Sans"
        ],
        "headline-xl-mobile": [
          "Space Grotesk"
        ],
        "stat-display": [
          "Space Grotesk"
        ],
        "headline-lg-mobile": [
          "Space Grotesk"
        ],
        "headline-sm": [
          "Space Grotesk"
        ],
        "display": [
          "\"Space Grotesk\"",
          "sans-serif"
        ],
        "mono": [
          "\"JetBrains Mono\"",
          "monospace"
        ],
        "inter": [
          "Inter",
          "sans-serif"
        ]
      },
      "fontSize": {
        "headline-md": [
          "20px",
          {
            "lineHeight": "26px",
            "letterSpacing": "-0.02em",
            "fontWeight": "600"
          }
        ],
        "headline-xl": [
          "40px",
          {
            "lineHeight": "44px",
            "letterSpacing": "-0.03em",
            "fontWeight": "700"
          }
        ],
        "body-lg": [
          "18px",
          {
            "lineHeight": "28px",
            "letterSpacing": "-0.01em",
            "fontWeight": "400"
          }
        ],
        "label-md": [
          "13px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.02em",
            "fontWeight": "600"
          }
        ],
        "body-md": [
          "15px",
          {
            "lineHeight": "24px",
            "letterSpacing": "0em",
            "fontWeight": "400"
          }
        ],
        "label-sm": [
          "11px",
          {
            "lineHeight": "14px",
            "letterSpacing": "0.06em",
            "fontWeight": "700"
          }
        ],
        "headline-lg": [
          "32px",
          {
            "lineHeight": "38px",
            "letterSpacing": "-0.025em",
            "fontWeight": "700"
          }
        ],
        "body-sm": [
          "13px",
          {
            "lineHeight": "18px",
            "letterSpacing": "0em",
            "fontWeight": "400"
          }
        ],
        "headline-xl-mobile": [
          "30px",
          {
            "lineHeight": "34px",
            "letterSpacing": "-0.03em",
            "fontWeight": "700"
          }
        ],
        "stat-display": [
          "48px",
          {
            "lineHeight": "48px",
            "letterSpacing": "-0.04em",
            "fontWeight": "700"
          }
        ],
        "headline-lg-mobile": [
          "24px",
          {
            "lineHeight": "30px",
            "letterSpacing": "-0.02em",
            "fontWeight": "700"
          }
        ],
        "headline-sm": [
          "16px",
          {
            "lineHeight": "22px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ]
      },
      "boxShadow": {
        "card-luxe": "0 25px 60px -15px rgba(2, 27, 50, 0.22), 0 0 0 1px rgba(209, 161, 83, 0.35)",
        "card-glow": "0 0 45px -5px rgba(219, 0, 7, 0.15)"
      }
    },
  },
  plugins: [],
};

export default config;
