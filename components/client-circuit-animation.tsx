'use client'

import dynamic from 'next/dynamic'

// Client-side only CircuitAnimation to avoid SSR overhead
const CircuitAnimation = dynamic(
  () => import('./circuit-animation').then(mod => ({ default: mod.CircuitAnimation })),
  {
    ssr: false, // This is allowed in client components
    loading: () => <div className="animate-pulse bg-muted/10 absolute inset-0 opacity-20" />,
  }
)

export function ClientCircuitAnimation() {
  return <CircuitAnimation />
} 