import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useState, useEffect } from 'react'
import { getLocationFromIP, reverseGeocode } from './geolocation'

// Tailwind merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Cache constants for geolocation
export const CACHE_KEY_IP = 'medimate_ip_geo'
export const CACHE_KEY_GEO_PREFIX = 'medimate_geo'
export const CACHE_EXPIRY_24H = 24 * 60 * 60 * 1000 // 24 hours

// Debounce hook for search inputs
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Export geolocation (despite file re-export issue)
export { getLocationFromIP, reverseGeocode }

// Note: calculateDistance/formatDistance moved to main utils if needed

