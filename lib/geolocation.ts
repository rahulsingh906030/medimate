import { calculateDistance, formatDistance } from './utils'

// Type for location
export interface Location {
  lat: number
  lng: number
  address?: string
  city?: string
}

// Free IP geolocation API for India (no key, rate limited)
async function getIPLocation(): Promise<Location | null> {
  try {
    const res = await fetch('https://ipapi.co/json/')
    const data = await res.json()
    
    // India focus: Gaya/Bihar coords if matches
    if (data.country === 'IN') {
      const city = data.city?.toLowerCase()
      if (city?.includes('gaya') || city?.includes('bihar')) {
        return {
          lat: 24.6969, 
          lng: 85.0000, 
          city: 'Gaya, Bihar',
          address: `${data.city}, Bihar, India`
        }
      }
      // Other India fallback (Delhi if no GPS)
      return {
        lat: data.latitude || 28.6139,
        lng: data.longitude || 77.2090,
        city: data.city || 'Delhi',
        address: data.city_state || ' all India'
      }
    }
  } catch (err) {
    console.warn('IP geolocation failed:', err)
  }
  return null
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
      async (error) => {
        console.warn('GPS failed, trying IP:', error)
        const ipLoc = await getIPLocation()
        if (ipLoc) {
          resolve(ipLoc)
        } else {
          // Final Delhi fallback
          resolve({ lat: 28.6139, lng: 77.2090, city: 'Delhi Fallback' })
        }
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 5 * 60 * 1000 
      }
    )
  })
}

// Reverse geocode lat/lng to address/city
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  
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

  // Nominatim fallback
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
    )
    const data = await res.json()
    return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  } catch {
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`
  }
}

// Main: GPS + IP fallback + address
export async function getUserLocation(): Promise<Location> {
  const loc = await getCurrentLocation()
  const address = await reverseGeocode(loc.lat, loc.lng)
  return { ...loc, address }
}

// Manual location override for testing (Gaya example)
export function getTestLocation(city: 'gaya' | 'delhi' | 'noida'): Location {
  const locs: Record<string, Location> = {
    gaya: { lat: 24.6969, lng: 85.0000, city: 'Gaya, Bihar' },
    delhi: { lat: 28.6139, lng: 77.2090, city: 'Delhi' },
    noida: { lat: 28.5355, lng: 77.3910, city: 'Noida, UP' }
  }
  return locs[city] || locs.delhi
}

