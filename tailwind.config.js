/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        // Mobile-first breakpoints
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1280px',
      },
      spacing: {
        // Mobile-optimized spacing
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        // Mobile-specific spacing
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      colors: {
        // Bond Theme Tokens (Dark theme)
        bg: '#1C1C1C', // Deep Charcoal, primary background
        fg: '#EAF9FB', // Beautiful White, primary foreground
        muted: '#A7B0B2', // supporting text
        surface: '#232323', // cards/sections
        border: '#2E2E2E', // borders
        'warm-sand': '#F5E9DA', // Warm Neutral Sand
        accent: {
          400: '#F5E9DA',
          600: '#EAD9C5',
          from: '#F5E9DA', // Warm Neutral Sand start
          to: '#EAD9C5',   // Slightly deeper warm sand end
          DEFAULT: '#F5E9DA',
        },
        // Keep existing for compatibility
        primary: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#00C9A7',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          DEFAULT: '#00C9A7',
        },
        // Additional colors for compatibility
        dark: {
          50: '#232323',
          100: '#1F1F1F',
          200: '#1D1D1D',
          300: '#B0B0B0',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#2E2E2E',
          800: '#1C1C1C',
          900: '#141414',
          950: '#0F0F0F',
        },
        light: {
          50: '#FFFFFF',
          60: 'rgba(255,255,255,0.6)',
          70: 'rgba(255,255,255,0.7)',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        // Modern Minimalism & Polished Brutalism Typography
        sans: ['Manrope', 'system-ui', 'sans-serif'], // Body text
        display: ['Anton', 'system-ui', 'sans-serif'], // Hero, headings
        hero: ['Anton', 'system-ui', 'sans-serif'], // Large display
        ui: ['Inter', 'system-ui', 'sans-serif'], // UI elements
        mono: ['Geist Mono', 'monospace'], // Technical elements
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'ultra': '0.25em',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        // Mobile-optimized responsive typography
        'hero': ['clamp(2.5rem, 8vw, 8rem)', { lineHeight: '0.9' }],
        'display': ['clamp(1.75rem, 6vw, 6rem)', { lineHeight: '1.1' }],
        'mobile-hero': ['clamp(2rem, 6vw, 4rem)', { lineHeight: '0.9' }],
        'mobile-display': ['clamp(1.5rem, 5vw, 3rem)', { lineHeight: '1.1' }],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem', // Bond cards/sections
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
        // Bond hover shadows
        'bond-hover': '0 8px 32px rgba(0, 201, 167, 0.15)',
        'bond-glow': '0 0 20px rgba(0, 201, 167, 0.3)',
        // Mobile-optimized shadows
        'mobile': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'mobile-lg': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'progress-fill': 'progressFill 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'shine': 'shine 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        // Mobile-optimized animations
        'mobile-fade-in': 'mobileFadeIn 0.4s ease-out',
        'mobile-slide-up': 'mobileSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(73, 197, 182, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(73, 197, 182, 0.8)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Mobile-optimized keyframes
        mobileFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        mobileSlideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // Mobile-optimized container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2.5rem',
          xl: '3rem',
        },
      },
    },
  },
  plugins: [],
}