import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import { Analytics } from "@/components/analytics"
import { SpeedInsights } from "@/components/speed-insights"
import { WebVitals } from "@/components/web-vitals"
import { BrowserExtensionSuppressor } from "@/components/browser-extension-suppressor"
import { Toaster } from "@/components/ui/toaster"
import { MouseFollower } from "@/components/mouse-follower"
import { Suspense } from "react"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
  preload: true
})

// Viewport configuration for better mobile performance
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2196f3' },
    { media: '(prefers-color-scheme: dark)', color: '#991b1b' }
  ],
}

// Enhanced metadata for SSG optimization
export const metadata: Metadata = {
  title: {
    default: "Veeraselvam - React Developer Portfolio",
    template: "%s | Veeraselvam"
  },
  description: "Hi, I'm Veeraselvam, a React developer crafting smooth, scalable, and stunning web experiences. Specialized in Next.js, TypeScript, and modern frontend development.",
  keywords: ["React Developer", "Next.js", "TypeScript", "Frontend Developer", "JavaScript", "Web Development", "Portfolio"],
  authors: [{ name: "Veeraselvam" }],
  creator: "Veeraselvam",
  publisher: "Veeraselvam",
  generator: 'Next.js',
  applicationName: "Veeraselvam Portfolio",
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://veeraselvam.vercel.app'), // Update with your domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://veeraselvam.vercel.app', // Update with your domain
    siteName: 'Veeraselvam Portfolio',
    title: 'Veeraselvam - React Developer Portfolio',
    description: 'React developer crafting smooth, scalable, and stunning web experiences. Specialized in Next.js, TypeScript, and modern frontend development.',
    images: [
      {
        url: '/about.png', // Using existing about image
        width: 1200,
        height: 630,
        alt: 'Veeraselvam - React Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Veeraselvam - React Developer Portfolio',
    description: 'React developer crafting smooth, scalable, and stunning web experiences.',
    images: ['/about.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add when you have these services set up
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        {/* Preload critical resources */}
        <link rel="preload" href="/about.png" as="image" type="image/png" />
        <link rel="preload" href="/movapp.png" as="image" type="image/png" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
        
        {/* Browser extension compatibility */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} bg-background`} suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <BrowserExtensionSuppressor />
        <MouseFollower />
        <div className="fixed inset-0 z-0 grid-background pointer-events-none"></div>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </Suspense>
        <Analytics />
        <SpeedInsights />
        <WebVitals />
        <Toaster />
      </ThemeProvider>
      </body>
      </html>
  )
}
