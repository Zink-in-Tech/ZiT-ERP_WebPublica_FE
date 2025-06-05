/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#AC69FF',
          light: '#BF8AFF',
          dark: '#9940FF'
        },
        blue: {
          primary: '#007EFF',
          secondary: '#008ED3'
        },
        black: '#25282B',
        dark: {
          DEFAULT: '#25282B',
          50: '#9CA3AF',
          100: '#6B7280',
          200: '#4B5563',
          300: '#374151',
          400: '#1F2937',
          500: '#111827',
          600: '#0F172A',
          700: '#0D1120',
          800: '#0B0F1A',
          900: '#090C14',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        base: '16px'
      },
      lineHeight: {
        relaxed: '1.75'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'figure img': {
              margin: '0 auto',
            },
            img: {
              borderRadius: theme('borderRadius.lg'),
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            figure: {
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            figcaption: {
              textAlign: 'center',
              fontStyle: 'italic',
              color: theme('colors.gray.400'),
              marginTop: '0.5rem',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray[300]'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-bullets': theme('colors.gray[400]'),
            '--tw-prose-hr': theme('colors.dark[600]'),
            '--tw-prose-quotes': theme('colors.gray[200]'),
            '--tw-prose-quote-borders': theme('colors.primary.DEFAULT'),
            '--tw-prose-captions': theme('colors.gray[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.gray[300]'),
            '--tw-prose-pre-bg': theme('colors.dark[800]'),
            '--tw-prose-th-borders': theme('colors.dark[600]'),
            '--tw-prose-td-borders': theme('colors.dark[600]'),
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
