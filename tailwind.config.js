/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Obsidian Rose (Public-facing pages) ── */
        primary: {
          DEFAULT: '#ba0036',
          container: '#e21e4a',
          fixed: '#ffdada',
          'fixed-dim': '#ffb2b6',
        },
        secondary: {
          DEFAULT: '#375ca8',
          container: '#8aacfe',
          fixed: '#d9e2ff',
          'fixed-dim': '#b0c6ff',
        },
        tertiary: {
          DEFAULT: '#006a45',
          container: '#008558',
          fixed: '#80f9bd',
          'fixed-dim': '#62dca3',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        surface: {
          DEFAULT: '#f9f9f9',
          dim: '#dadada',
          bright: '#f9f9f9',
          'container-lowest': '#ffffff',
          'container-low': '#f3f3f3',
          container: '#eeeeee',
          'container-high': '#e8e8e8',
          'container-highest': '#e2e2e2',
          variant: '#e2e2e2',
          tint: '#be0038',
        },
        outline: {
          DEFAULT: '#906f70',
          variant: '#e5bdbe',
        },
        'on-surface': '#1a1c1c',
        'on-surface-variant': '#5c3f41',
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        'on-tertiary': '#ffffff',
        'on-error': '#ffffff',
        'on-background': '#1a1c1c',
        background: '#f9f9f9',
        'inverse-surface': '#2f3131',
        'inverse-on-surface': '#f1f1f1',
        'inverse-primary': '#ffb2b6',

        /* ── Obsidian (Admin pages) ── */
        admin: {
          primary: '#3525cd',
          'primary-container': '#4f46e5',
          surface: '#f7f9fb',
          'surface-low': '#f2f4f6',
          'surface-lowest': '#ffffff',
          'on-surface': '#191c1e',
          'on-surface-variant': '#464555',
          outline: '#cbd5e1',
        },

        /* ── Legacy aliases (used widely in existing components) ── */
        on_surface: '#1a1c1c',
        on_surface_variant: '#5c3f41',
        outline_variant: '#e5bdbe',
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        label: ['"Inter"', 'sans-serif'],
        /* Legacy aliases */
        plus: ['"Plus Jakarta Sans"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        ambient: '0 8px 32px 0 rgba(26, 28, 28, 0.04)',
        'ambient-md': '0 4px 16px 0 rgba(26, 28, 28, 0.06)',
        'ambient-lg': '0 12px 48px 0 rgba(26, 28, 28, 0.08)',
      },
      spacing: {
        128: '32rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      maxWidth: {
        page: '1440px',
      },
      aspectRatio: {
        '3/4': '3 / 4',
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [],
}
