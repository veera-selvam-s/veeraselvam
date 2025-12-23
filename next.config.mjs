import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build optimizations
  // Note: eslint config moved to next.config.mjs is deprecated in Next.js 16
  // Use next lint command or configure in eslint.config.js instead
  typescript: {
    ignoreBuildErrors: false, // Fix TypeScript errors instead of ignoring them
  },
  
  // Turbopack configuration (Next.js 16 uses Turbopack by default)
  // Adding empty config to allow webpack config to work
  turbopack: {
    root: process.cwd(), // Fix lockfile warning by setting explicit root
  },

  // Advanced bundling optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Advanced chunk splitting for client-side only
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for React and Next.js
          framework: {
            name: "framework",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // UI libraries chunk
          ui: {
            name: "ui",
            chunks: "all",
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|framer-motion)[\\/]/,
            priority: 30,
            enforce: true,
          },
          // Common vendor libraries
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            enforce: true,
          },
          // App code
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 10,
            enforce: true,
          },
        },
      };
    }

    return config;
  },

  // Image optimization
  images: {
    unoptimized: false, // Enable optimization for better performance
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    minimumCacheTTL: 31536000, // 1 year cache for images
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? { properties: ["^data-testid$"] }
        : false,
  },

  // Static export configuration (uncomment for static export)
  // output: 'export',
  // trailingSlash: true,

  // PWA and caching
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
      ],
    },
    {
      source: "/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(.*)\\.(js|css|woff|woff2|eot|ttf|otf)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-label",
      "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip",
      "framer-motion",
      "date-fns",
      "recharts",
    ],
    optimizeServerReact: true,
    serverMinification: true,
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzer(nextConfig);
