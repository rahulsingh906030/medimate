import { calculateDistance, formatDistance } from './utils'

// Type for location
export interface Location {
  lat: number
  lng: number
  address?: string
  city?: string
}

// Get current position with error handling
export async function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation not supported'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        resolve({ lat, lng })
      },
      (error) => {
        // Fallback to Delhi (central for India)
        console.warn('Geolocation failed, using Delhi:', error)
        resolve({ lat: 28.6139, lng: 77.2090 })
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 5 * 60 * 1000 // 5 min
      }
    )
  })
}

// Reverse geocode lat/lng to address/city (Google priority, Nominatim fallback)
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY // Client-side key (restrict to Geocoding)
  
  if (apiKey) {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      )
      const data = await res.json()
      if (data.status === 'OK' && data.results[0]) {
        return data.results[0].formatted_address
      }
    } catch {}
  }

  // Free fallback: Nominatim (rate limited, no key)
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
    )
    const data = await res.json()
    return data.display_name || 'Unknown location'
  } catch {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  }
}

// Combined: Get location + address
export async function getUserLocation(): Promise<Location> {
  const loc = await getCurrentLocation()
  const address = await reverseGeocode(loc.lat, loc.lng)
  return { ...loc, address }
}
