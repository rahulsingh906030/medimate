import { NextRequest, NextResponse } from 'next/server'
import { MOCK_DOCTORS_BY_SPECIALTY, getMockDoctorsForSpecialty, type MockDoctor } from './mocks'
import { GAYA_DOCTORS_BY_SPECIALTY, getGayaDoctorsForSpecialty } from './mocks-gaya'
import { calculateDistance } from '@/lib/utils'

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || ''

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get('lat') || '24.6969') // Gaya default
  const lng = parseFloat(searchParams.get('lng') || '85.0000')
  const specialty = searchParams.get('specialty') || 'General Physician'

  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'Latitude and longitude required' }, { status: 400 })
  }

  // City-aware base doctors selection
  let baseDoctors: MockDoctor[]
  const isGayaRegion = lat > 24.5 && lat < 25.0 && lng > 84.8 && lng < 85.2 // Gaya bounding box
  if (isGayaRegion) {
    console.log('🌟 Gaya region detected - using local doctors')
    baseDoctors = getGayaDoctorsForSpecialty(specialty, 8)
  } else {
    console.log('📍 Using NCR doctors')
    baseDoctors = getMockDoctorsForSpecialty(specialty, 8)
  }

  console.log(`🔍 Generating dynamic mock doctors for ${specialty} around [${lat.toFixed(4)}, ${lng.toFixed(4)}] (${isGayaRegion ? 'Gaya' : 'NCR'})`)

  // Perturb coordinates around USER location (±0.04 deg ~4-5km radius scatter)
  // Simulates realistic nearby doctors
  const dynamicDoctors: MockDoctor[] = baseDoctors.slice(0, 6).map((doc, index) => {
    // Random offset: max 0.04° lat/lng (~4.4km)
    const latOffset = (Math.random() - 0.5) * 0.08
    const lngOffset = (Math.random() - 0.5) * 0.08
    const newLat = lat + latOffset
    const newLng = lng + lngOffset
    
    // Approximate distance for sorting/display
    const distanceKm = calculateDistance(lat, lng, newLat, newLng)
    
    // Generic address update (use user city or fallback)
    const addressParts = doc.address.split(', ')
    const cityish = addressParts[addressParts.length - 2] || 'Local Area'
    const newAddress = `${doc.hospital}, ${cityish} (${distanceKm.toFixed(1)}km)`

    return {
      ...doc,
      place_id: `dynamic_${doc.place_id}_${Date.now()}_${index}`,
      lat: newLat,
      lng: newLng,
      address: newAddress,
      phone: doc.phone.replace(/(\d{5})(\d{5})/, '$1$2'), // Slightly vary phone
      rating: Math.max(4.0, (doc.rating + (Math.random() - 0.5) * 0.5).toFixed(1) as any),
      experience: `${Math.floor(10 + Math.random() * 15)}+ years` // 10-25 years
    }
  })

  // Sort by distance (closest first)
  dynamicDoctors.sort((a, b) => calculateDistance(lat, lng, a.lat, a.lng) - calculateDistance(lat, lng, b.lat, b.lng))

  const responseData = {
    doctors: dynamicDoctors,
    next_page_token: null,
    source: 'dynamic-mock',
    user_location: { lat, lng },
    count: dynamicDoctors.length,
    message: `Generated ${dynamicDoctors.length} dynamic doctors within ~5km of your location`
  }

  console.log(`✅ Generated ${dynamicDoctors.length} location-aware doctors for ${specialty}`)
  return NextResponse.json(responseData)
}

