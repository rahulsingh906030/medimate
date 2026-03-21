// Location utilities using free APIs (no API key needed)

import { CACHE_KEY_IP, CACHE_KEY_GEO_PREFIX, CACHE_EXPIRY_24H } from './utils'

// Get approximate location from IP using ipapi.co (free tier, cached)
export async function getLocationFromIP(): Promise<{lat: number, lng: number, city?: string, country?: string} | null> {
  const cacheKey = CACHE_KEY_IP
  const cached = localStorage.getItem(cacheKey)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_EXPIRY_24H) {
      return data
    }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    clearTimeout(timeout)
    if (!response.ok) throw new Error('IP geolocation failed')
    const data = await response.json()
    const result = {
      lat: data.latitude,
      lng: data.longitude,
      city: data.city,
      country: data.country_name
    }
    localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }))
    return result
  } catch (error) {
    clearTimeout(timeout)
    console.warn('IP geolocation failed, using fallback:', error)
    return null
  }
}

// Reverse geocode lat/lng to readable address using Nominatim (cached, optional)
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const cacheKey = `${CACHE_KEY_GEO_PREFIX}_${lat.toFixed(4)}_${lng.toFixed(4)}`
  const cached = localStorage.getItem(cacheKey)
  if (cached) {
    const { data, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp < CACHE_EXPIRY_24H) {
      return data
    }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 3000)

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      { 
        signal: controller.signal,
        headers: { 'User-Agent': 'MediMate/1.0' } // Nominatim policy
      }
    )
    clearTimeout(timeout)
    if (!response.ok) throw new Error('Reverse geocoding failed')
    const data = await response.json()
    const result = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
    localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }))
    return result
  } catch (error) {
    clearTimeout(timeout)
    console.warn('Reverse geocoding failed:', error)
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  }
}

