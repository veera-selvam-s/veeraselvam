/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      flexbox: "no-2009",
      grid: "autoplace",
    },
    ...(process.env.NODE_ENV === "production" && {
      cssnano: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            mergeLonghand: true,
            mergeRules: true,
            minifySelectors: true,
            minifyParams: true,
            minifyFontValues: true,
            colormin: true,
            reduceIdents: false, // Keep this false to avoid breaking CSS variables
            zindex: false, // Keep this false to avoid z-index conflicts
          },
        ],
      },
    }),
  },
};

export default config;
