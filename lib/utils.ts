import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simplified image optimization utilities for SSG (without blur placeholders to avoid hydration issues)
export function getOptimizedImageProps(
  src: string,
  alt: string,
  width: number,
  height: number,
  priority = false
) {
  return {
    src,
    alt,
    width,
    height,
    priority,
    quality: 85,
    sizes: priority 
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw',
  }
}
