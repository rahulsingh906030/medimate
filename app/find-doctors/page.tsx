"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { MapPin, Search, Phone, Star, Navigation, AlertTriangle } from 'lucide-react'
import { Header } from '@/components/header'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { calculateDistance, formatDistance } from '@/lib/utils'

interface Doctor {
  name: string
  specialty: string
  rating: number
  experience: string
  hospital: string
  distance: string
  phone: string
  address: string
  lat: number
  lng: number
  place_id?: string
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
  const searchParams = useSearchParams()
  const [location, setLocation] = useState('')
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || '')
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userLat, setUserLat] = useState<number | null>(null)
  const [userLng, setUserLng] = useState<number | null>(null)
  const [userLocationName, setUserLocationName] = useState('Detecting location...')

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setUserLat(lat)
          setUserLng(lng)
          handleSearch()
        },
        () => {
          // Fallback to Noida, India
          setError('Using Noida location (enable GPS for accurate nearby)')
          setUserLat(28.5355)
          setUserLng(77.3910)
          handleSearch()
        }
      )
    } else {
      setUserLat(28.5355)
      setUserLng(77.3910)
      handleSearch()
    }
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    setError('')
    const lat = userLat || 28.5355
    const lng = userLng || 77.3910
    const spec = specialty || 'General Physician'

    try {
      const response = await fetch(`/api/doctors?lat=${lat}&lng=${lng}&specialty=${encodeURIComponent(spec)}`)
      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const doctorsWithDistance = data.doctors.map((doctor: Doctor) => ({
        ...doctor,
        distance: formatDistance(calculateDistance(lat, lng, doctor.lat, doctor.lng))
      }))

      setDoctors(doctorsWithDistance)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
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
            <p className="text-muted-foreground">Real doctors in your area (Noida/Delhi)</p>
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
                <Button onClick={handleSearch} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  {loading ? 'Searching...' : 'Find Doctors'}
                </Button>
              </div>
            </div>
          </Card>

          {userLat && userLng && (
            <Card className="p-4 mb-6 bg-primary/5">
              <p className="text-sm">
                📍 Location: {userLat.toFixed(4)}, {userLng.toFixed(4)} • <strong>{specialty || 'All'}</strong>
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

          <div className="space-y-4 mb-8">
            {loading ? (
              <Card className="p-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p>Finding real nearby doctors...</p>
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
                <p>Select specialty and search, or add Google API key for real data.</p>
              </Card>
            )}
          </div>

          <Card>
            <iframe
              width="100%"
              height="400"
              loading="lazy"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14028.514!2d77.3908!3d28.5355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf0d5b!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1724221651271`}
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-b-lg"
            />
          </Card>
        </div>
      </main>
    </div>
  )
}

