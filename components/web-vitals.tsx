'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric)
    }

    // Send to analytics service in production
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Example: Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', metric.name, {
          custom_map: { metric_id: 'web_vitals' },
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        })
      }

      // Example: Send to custom analytics
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          id: metric.id,
          label: metric.label,
          delta: metric.delta,
        }),
      }).catch(console.error)
    }
  })

  return null
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
} 