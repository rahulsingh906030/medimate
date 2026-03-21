"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { useDebounce } from '@/lib/utils'
import { CACHE_KEY_IP } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { MapPin, Search, Phone, Star, Navigation, AlertTriangle } from 'lucide-react'
import { Header } from '@/components/header'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// Remove unused reexports - using SWR instead
import { getLocationFromIP, reverseGeocode } from '@/lib/geolocation'
import type { Doctor as DoctorType } from '@/lib/geolocation'
import { calculateDistance, formatDistance } from '@/lib/utils'
import { useCallback } from "react"

interface Doctor extends DoctorType {
  distance: string
}

const SPECIALTIES = [
  'General Physician',
  'Cardiologist',
  'Neurologist',
  'Dermatologist',
  'Orthopedic',
  'Pediatrician',
  'Psychiatrist',
  'ENT Specialist',
  'Gynecologist',
  'Ophthalmologist',
  'General',
  'Dentist',
  'Gastroenterologist'
]

export default function FindDoctorsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [router])

  // Early return if not authenticated (prevents flash)
  if (!isAuthenticated()) {
    return null
  }
  const [location, setLocation] = useState('')
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || '')
  const debouncedSpecialty = useDebounce(specialty, 300)
  
// SWR fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('Failed to fetch doctors')
    ;(error as any).status = res.status
    throw error
  }
  return res.json()
}

// SWR for doctors data (with fallback source display)
const { data: apiData, error: apiError, isLoading } = useSWR(
  userLat && userLng && debouncedSpecialty ? 
    `/api/doctors?lat=${userLat}&lng=${userLng}&specialty=${encodeURIComponent(debouncedSpecialty)}` : 
    null,
  fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  )

  const doctors: Doctor[] = (() => {
    if (!apiData?.doctors || !userLat || !userLng) return []
    return apiData.doctors.map((doctor: any) => ({
      ...doctor,
      distance: doctor.lat && doctor.lng ? formatDistance(calculateDistance(userLat, userLng, doctor.lat, doctor.lng)) : 'Nearby'
    })) as Doctor[]
  })()

  const [error, setError] = useState('')
  const [userLat, setUserLat] = useState<number | null>(null)
  const [userLng, setUserLng] = useState<number | null>(null)
  const [userLocationName, setUserLocationName] = useState('Detecting location...')
  const [geoLoading, setGeoLoading] = useState(true)

  // Check cached location first
  useEffect(() => {
    const cachedIP = localStorage.getItem(CACHE_KEY_IP)
    if (cachedIP) {
      try {
        const { data } = JSON.parse(cachedIP)
        setUserLat(data.lat)
        setUserLng(data.lng)
        setUserLocationName('Using cached location')
        setGeoLoading(false)
        return
      } catch {}
    }
    
    // GPS + fallbacks (reduced timeout)
    const detectLocation = async () => {
      setGeoLoading(true)
      setUserLocationName('Detecting GPS...')
      
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            setUserLat(lat)
            setUserLng(lng)
            setUserLocationName('GPS location ready')
            setGeoLoading(false)
          },
          async () => {
            // IP fallback
            setUserLocationName('GPS denied, using IP...')
            const ipLoc = await getLocationFromIP()
            if (ipLoc) {
              setUserLat(ipLoc.lat)
              setUserLng(ipLoc.lng)
              setUserLocationName(`IP: ${ipLoc.city || 'Detected'}`)
            } else {
              setError('Location unavailable')
            }
            setGeoLoading(false)
          },
          {
            enableHighAccuracy: false, // Faster
            timeout: 5000,
            maximumAge: 30 * 60 * 1000, // 30 min cache
          }
        )
      } else {
        const ipLoc = await getLocationFromIP()
        if (ipLoc) {
          setUserLat(ipLoc.lat)
          setUserLng(ipLoc.lng)
          setUserLocationName(`IP: ${ipLoc.city || 'Detected'}`)
        }
        setGeoLoading(false)
      }
    }

    detectLocation()
  }, [])

  // Manual refresh button handler (SWR auto-updates)
  const handleManualRefresh = async () => {
    if (userLat && userLng) {
      setError('')
    }
  }

  const openInMaps = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Find Nearby Doctors & Hospitals</h1>
<p className="text-muted-foreground">Real doctors & hospitals from your current location worldwide</p>
          </div>

          <Card className="p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input placeholder="Current location auto-detected" value={userLocationName} className="w-full bg-muted" readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Specialty</label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALTIES.map((spec) => (
                      <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleManualRefresh} disabled={geoLoading || isLoading} className="w-full">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  {isLoading ? 'Searching...' : 'Refresh'}
                </Button>
              </div>
            </div>
          </Card>

          {userLat && userLng && (
            <Card className="p-4 mb-6 bg-primary/5">
              <p className="text-sm">
                📍 {userLocationName} ({userLat?.toFixed(4)}, {userLng?.toFixed(4)}) • <strong>{specialty || 'All'}</strong>
              </p>
            </Card>
          )}

{error && (
            <Card className="p-4 mb-6 border-destructive bg-destructive/5">
              <div className="flex gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </Card>
          )}
          {apiError && !error && (
            <Card className="p-4 mb-6 border-yellow-500 bg-yellow-50">
              <div className="flex gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <span>API error: {apiError.message || 'Try refresh'}</span>
              </div>
            </Card>
          )}

          <div className="space-y-4 mb-8">
            {(geoLoading || isLoading) ? (
              <Card className="p-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>{geoLoading ? 'Getting your location...' : 'Loading doctors...'}</p>
              </Card>
            ) : doctors.length ? (
              doctors.map((doctor, i) => (
                <Card key={doctor.place_id || i} className="p-6 hover:shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold">{doctor.name}</h3>
                        {doctor.rating > 0 && (
                          <div className="bg-accent/10 px-3 py-1 rounded-full flex items-center gap-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            {doctor.rating}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>{doctor.hospital}</strong></p>
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {doctor.address}
                          <span className="font-bold text-primary ml-auto">{doctor.distance}</span>
                        </p>
                        {doctor.phone !== 'N/A' && (
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {doctor.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 lg:flex-col min-w-[140px]">
                      {doctor.phone !== 'N/A' && (
                        <Button variant="outline" asChild>
                          <a href={`tel:${doctor.phone}`}>
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </a>
                        </Button>
                      )}
                      <Button onClick={() => openInMaps(doctor.address)}>
                        <Navigation className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No Doctors Found</h3>
                <p className="text-sm">{apiData?.source || 'mock'}</p>
                <p>Try another specialty or refresh</p>
              </Card>
            )}
          </div>

          <Card>
            <iframe
              width="100%"
              height="400"
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${userLat},${userLng}&maptype=satellite`}
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-b-lg"
            />
            {!userLat && (
              <div className="p-8 text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enable location access for dynamic map</p>
              </div>
            )}
            
          </Card>
        </div>
      </main>
    </div>
  )
}

