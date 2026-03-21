import { NextRequest, NextResponse } from 'next/server'
import { MOCK_DOCTORS_BY_SPECIALTY } from './mocks'
import { getLocationFromIP } from '@/lib/utils'

const API_KEY = process.env.GOOGLE_PLACES_API_KEY

// Simple in-memory cache (60s TTL)
const mockCache = new Map()
const CACHE_TTL = 60 * 1000 // 1 minute

import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { user, response } = requireAuth(request)
  if (response) return response

  const { searchParams } = new URL(request.url)
  const latParam = searchParams.get('lat')
  const lngParam = searchParams.get('lng')
  let lat = latParam ? parseFloat(latParam) : NaN
  let lng = lngParam ? parseFloat(lngParam) : NaN
  let specialty = searchParams.get('specialty') || 'General Physician'

  // Auto-detect location from IP if not provided
  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    try {
      const ipLoc = await getLocationFromIP()
      if (ipLoc) {
        lat = ipLoc.lat
        lng = ipLoc.lng
      } else {
        return NextResponse.json({ error: 'Location required. Provide lat/lng or enable auto-detection.' }, { status: 400 })
      }
    } catch (error) {
      return NextResponse.json({ error: 'Auto-detection failed. Provide lat/lng params.' }, { status: 400 })
    }
  }

  // Specialty fallback + cache
  const cacheKey = `mock_${specialty}_${lat.toFixed(4)}_${lng.toFixed(4)}`
  const cached = mockCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({ ...cached.data, source: 'mock-cache' })
  }

  let mockData: any[] = []
  if (MOCK_DOCTORS_BY_SPECIALTY[specialty]) {
    mockData = MOCK_DOCTORS_BY_SPECIALTY[specialty]
  } else {
    // Fallback to default and log
    console.warn(`Unknown specialty "${specialty}", falling back to General Physician`)
    specialty = 'General Physician'
    mockData = MOCK_DOCTORS_BY_SPECIALTY.default || []
  }

  const cacheData = { doctors: mockData, timestamp: Date.now() }
  mockCache.set(cacheKey, cacheData)

  if (!API_KEY) {
    return NextResponse.json({ ...cacheData, next_page_token: null, source: 'mock' })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=20000&type=doctor|hospital|pharmacy&keyword=${encodeURIComponent(specialty)}&key=${API_KEY}`
    
    const response = await fetch(nearbyUrl, { signal: controller.signal })
    clearTimeout(timeout)
    const data = await response.json()

    if (data.status !== 'OK') {
      // Fallback with warning
      console.warn(`Google Places failed (status: ${data.status}), using fallback for "${specialty}"`)
      return NextResponse.json({ doctors: cacheData.doctors, next_page_token: null, source: 'google-fallback-mock' })
    }

    const doctors = data.results.slice(0, 10).map((place: { name: string; rating?: number; types: string[]; formatted_phone_number?: string; vicinity?: string; formatted_address?: string; place_id: string; geometry: { location: { lat: number; lng: number } } }) => ({
      name: place.name,
      specialty,
      rating: place.rating ? Math.round(place.rating * 10) / 10 : 4.0,
      experience: 'N/A',
      hospital: place.types.includes('hospital') ? place.name : `${specialty} Clinic`,
      distance: 'Nearby',
      phone: place.formatted_phone_number || 'N/A',
      address: place.vicinity || place.formatted_address || 'Address not available',
      place_id: place.place_id,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
    }))

    return NextResponse.json({ doctors, next_page_token: data.next_page_token, source: 'google' })
  } catch (error) {
    console.warn('Google Places fetch error:', error)
    return NextResponse.json({ doctors: cacheData.doctors, next_page_token: null, source: 'google-error-mock' })
  }
}

