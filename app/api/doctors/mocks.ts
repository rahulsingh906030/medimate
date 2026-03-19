// Mock Indian doctors for Delhi/NCR fallback (no API key needed)
export const MOCK_DOCTORS_BY_SPECIALTY: Record<string, Array<{
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  hospital: string;
  phone: string;
  address: string;
  place_id: string;
  lat: number;
  lng: number;
}>> = {
  'General Physician': [
    {
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      rating: 4.5,
      experience: '15+ years',
      hospital: 'Apollo Clinic, Sector 18',
      phone: '+91 98765 43210',
      address: 'Sector 18, Noida, UP 201301',
      place_id: 'mock_gen1',
      lat: 28.565,
      lng: 77.395
    },
    {
      name: 'Dr. Anita Sharma',
      specialty: 'General Physician',
      rating: 4.3,
      experience: '12 years',
      hospital: 'Max Hospital, Vaishali',
      phone: '+91 98123 45678',
      address: 'Sector 4, Vaishali, Ghaziabad, UP',
      place_id: 'mock_gen2',
      lat: 28.645,
      lng: 77.425
    }
  ],
  'Cardiologist': [
    {
      name: 'Dr. Vikram Singh',
      specialty: 'Cardiologist',
      rating: 4.7,
      experience: '20 years',
      hospital: 'Fortis Hospital, Noida',
      phone: '+91 99111 22233',
      address: 'Sector 62, Noida, UP 201301',
      place_id: 'mock_card1',
      lat: 28.620,
      lng: 77.380
    },
    {
      name: 'Dr. Neha Gupta',
      specialty: 'Cardiologist',
      rating: 4.6,
      experience: '18 years',
      hospital: 'Jaypee Hospital, Noida',
      phone: '+91 88222 33344',
      address: 'Sector 128, Noida, UP',
      place_id: 'mock_card2',
      lat: 28.540,
      lng: 77.385
    }
  ],
  'Neurologist': [
    {
      name: 'Dr. Arjun Patel',
      specialty: 'Neurologist',
      rating: 4.4,
      experience: '16 years',
      hospital: 'Yatharth Hospital, Noida',
      phone: '+91 98777 88899',
      address: 'Sector 110, Noida Ext, UP',
      place_id: 'mock_neuro1',
      lat: 28.595,
      lng: 77.430
    }
  ],
  'Dermatologist': [
    {
      name: 'Dr. Kavita Reddy',
      specialty: 'Dermatologist',
      rating: 4.8,
      experience: '10 years',
      hospital: 'Kaya Skin Clinic',
      phone: '+91 99999 00000',
      address: 'DLF Mall, Sector 18, Noida',
      place_id: 'mock_derm1',
      lat: 28.570,
      lng: 77.400
    }
  ],
  // Add more for other specialties as needed
  default: [
    {
      name: 'Dr. Sanjay Verma',
      specialty: 'General Physician',
      rating: 4.2,
      experience: '14 years',
      hospital: 'Felix Hospital, Noida',
      phone: '+91 93123 45678',
      address: 'Sector 137, Noida, UP',
      place_id: 'mock_default',
      lat: 28.550,
      lng: 77.410
    }
  ]
}
