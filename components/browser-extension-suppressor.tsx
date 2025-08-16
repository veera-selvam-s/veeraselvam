'use client'

import { useEffect } from 'react'

export function BrowserExtensionSuppressor() {
  useEffect(() => {
    // Suppress common browser extension hydration warnings
    const originalConsoleError = console.error
    
    console.error = (...args) => {
      // Filter out hydration warnings caused by browser extensions
      const errorMessage = args[0]?.toString() || ''
      
      if (
        errorMessage.includes('Hydration failed') ||
        errorMessage.includes('Text content does not match') ||
        errorMessage.includes('data-new-gr-c-s-check-loaded') ||
        errorMessage.includes('data-gr-ext-installed') ||
        errorMessage.includes('data-locator-hook')
      ) {
        // Don't log browser extension hydration warnings in development
        if (process.env.NODE_ENV === 'development') {
          return
        }
      }
      
      // Log all other errors normally
      originalConsoleError.apply(console, args)
    }

    // Clean up on unmount
    return () => {
      console.error = originalConsoleError
    }
  }, [])

  return null
} 