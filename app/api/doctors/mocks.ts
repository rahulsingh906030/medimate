// Mock Indian doctors for Delhi/NCR fallback (no API key needed) - FULL COVERAGE
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
    },
    {
      name: 'Dr. Sanjay Verma',
      specialty: 'General Physician',
      rating: 4.2,
      experience: '14 years',
      hospital: 'Felix Hospital, Noida',
      phone: '+91 93123 45678',
      address: 'Sector 137, Noida, UP',
      place_id: 'mock_gen3',
      lat: 28.550,
      lng: 77.410
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
    },
    {
      name: 'Dr. Priya Malhotra',
      specialty: 'Neurologist',
      rating: 4.5,
      experience: '13 years',
      hospital: 'Kailash Hospital, Noida',
      phone: '+91 99551 11223',
      address: 'Sector 27, Noida, UP',
      place_id: 'mock_neuro2',
      lat: 28.580,
      lng: 77.390
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
    },
    {
      name: 'Dr. Rohan Mehra',
      specialty: 'Dermatologist',
      rating: 4.6,
      experience: '8 years',
      hospital: 'Aesthetic Clinic, Greater Noida',
      phone: '+91 98765 12345',
      address: 'Alpha Commercial Belt, Greater Noida',
      place_id: 'mock_derm2',
      lat: 28.495,
      lng: 77.505
    }
  ],
  'Orthopedic': [
    {
      name: 'Dr. Ramesh Yadav',
      specialty: 'Orthopedic',
      rating: 4.7,
      experience: '22 years',
      hospital: 'Kalyani Hospital, Greater Noida',
      phone: '+91 98100 12345',
      address: 'Chi V, Greater Noida West',
      place_id: 'mock_ortho1',
      lat: 28.510,
      lng: 77.445
    },
    {
      name: 'Dr. Sunita Bansal',
      specialty: 'Orthopedic',
      rating: 4.5,
      experience: '17 years',
      hospital: 'Metro Hospital, Noida',
      phone: '+91 92666 65432',
      address: 'Sector 11, Noida, UP',
      place_id: 'mock_ortho2',
      lat: 28.595,
      lng: 77.420
    }
  ],
  'Pediatrician': [
    {
      name: 'Dr. Meera Joshi',
      specialty: 'Pediatrician',
      rating: 4.8,
      experience: '11 years',
      hospital: 'Fortis Hospital, Noida',
      phone: '+91 99777 88999',
      address: 'Sector 62, Noida Ext',
      place_id: 'mock_ped1',
      lat: 28.615,
      lng: 77.375
    },
    {
      name: 'Dr. Amit Khanna',
      specialty: 'Pediatrician',
      rating: 4.6,
      experience: '14 years',
      hospital: 'Childrens Clinic, Ghaziabad',
      phone: '+91 98181 23456',
      address: 'Indirapuram, Ghaziabad',
      place_id: 'mock_ped2',
      lat: 28.635,
      lng: 77.365
    }
  ],
  'Psychiatrist': [
    {
      name: 'Dr. Sameer Kapoor',
      specialty: 'Psychiatrist',
      rating: 4.4,
      experience: '15 years',
      hospital: 'Manastha Clinic, Noida',
      phone: '+91 98765 98765',
      address: 'Sector 50, Noida, UP',
      place_id: 'mock_psy1',
      lat: 28.570,
      lng: 77.350
    },
    {
      name: 'Dr. Ritu Singhania',
      specialty: 'Psychiatrist',
      rating: 4.7,
      experience: '12 years',
      hospital: 'Hope Mental Health, Vaishali',
      phone: '+91 99119 22334',
      address: 'Vaishali Sector 4, Ghaziabad',
      place_id: 'mock_psy2',
      lat: 28.650,
      lng: 77.430
    }
  ],
  'ENT Specialist': [
    {
      name: 'Dr. Vikrant Oberoi',
      specialty: 'ENT Specialist',
      rating: 4.6,
      experience: '18 years',
      hospital: 'BLK-Max Super Speciality, NCR',
      phone: '+91 88000 66332',
      address: 'Panchsheel Park, Delhi (NCR)',
      place_id: 'mock_ent1',
      lat: 28.552,
      lng: 77.205
    },
    {
      name: 'Dr. Pooja Malik',
      specialty: 'ENT Specialist',
      rating: 4.5,
      experience: '9 years',
      hospital: 'ENT Clinic Noida',
      phone: '+91 95826 91234',
      address: 'Sector 61, Noida',
      place_id: 'mock_ent2',
      lat: 28.615,
      lng: 77.385
    }
  ],
  'Gynecologist': [
    {
      name: 'Dr. Shalini Agrawal',
      specialty: 'Gynecologist',
      rating: 4.8,
      experience: '16 years',
      hospital: 'Cloudnine Hospital, Noida',
      phone: '+91 88812 34567',
      address: 'Sector 47, Noida',
      place_id: 'mock_gyne1',
      lat: 28.570,
      lng: 77.335
    },
    {
      name: 'Dr. Ruchi Tandon',
      specialty: 'Gynecologist',
      rating: 4.7,
      experience: '20 years',
      hospital: 'CK Birla Hospital, Noida',
      phone: '+91 98183 45678',
      address: 'Sector 62, Noida',
      place_id: 'mock_gyne2',
      lat: 28.620,
      lng: 77.380
    }
  ],
  'Ophthalmologist': [
    {
      name: 'Dr. Rajiv Goel',
      specialty: 'Ophthalmologist',
      rating: 4.9,
      experience: '25 years',
      hospital: 'Eye Mantra, Noida',
      phone: '+91 97111 12345',
      address: 'Sector 19, Noida',
      place_id: 'mock_eye1',
      lat: 28.575,
      lng: 77.445
    },
    {
      name: 'Dr. Anjali Sharma',
      specialty: 'Ophthalmologist',
      rating: 4.6,
      experience: '11 years',
      hospital: 'Laxmi Eye Institute, Panipat (NCR)',
      phone: '+91 98120 33445',
      address: 'Panipat, Haryana',
      place_id: 'mock_eye2',
      lat: 29.390,
      lng: 76.970
    }
  ],
  'General': [
    {
      name: 'Dr. Prakash Chandra',
      specialty: 'General',
      rating: 4.3,
      experience: '19 years',
      hospital: 'Surbhi Hospital, Noida Ext',
      phone: '+91 99718 70507',
      address: 'Sector 35, Noida Ext',
      place_id: 'mock_genl1',
      lat: 28.590,
      lng: 77.445
    },
    {
      name: 'Dr. Nisha Rani',
      specialty: 'General',
      rating: 4.4,
      experience: '13 years',
      hospital: 'Universal Surya Hospital',
      phone: '+91 93191 11334',
      address: 'Sector 89, Noida',
      place_id: 'mock_genl2',
      lat: 28.555,
      lng: 77.445
    }
  ],
  'Dentist': [
    {
      name: 'Dr. Aryan Gupta',
      specialty: 'Dentist',
      rating: 4.9,
      experience: '10 years',
      hospital: 'Noida Dental Solutions',
      phone: '+91 92050 12345',
      address: 'Sector 73, Noida',
      place_id: 'mock_dent1',
      lat: 28.540,
      lng: 77.395
    },
    {
      name: 'Dr. Smriti Jain',
      specialty: 'Dentist',
      rating: 4.7,
      experience: '12 years',
      hospital: 'Clove Dental, Indirapuram',
      phone: '+91 78279 49001',
      address: 'Indirapuram, Ghaziabad',
      place_id: 'mock_dent2',
      lat: 28.645,
      lng: 77.370
    }
  ],
  'Gastroenterologist': [
    {
      name: 'Dr. Subhash Gupta',
      specialty: 'Gastroenterologist',
      rating: 4.7,
      experience: '24 years',
      hospital: 'Max Super Speciality Hospital, Vaishali',
      phone: '+91 92666 66880',
      address: 'Sector 5, Vaishali',
      place_id: 'mock_gastro1',
      lat: 28.655,
      lng: 77.430
    },
    {
      name: 'Dr. Vinod Kumar',
      specialty: 'Gastroenterologist',
      rating: 4.5,
      experience: '17 years',
      hospital: 'Gastro Clinic Noida',
      phone: '+91 98182 34567',
      address: 'Sector 27, Noida',
      place_id: 'mock_gastro2',
      lat: 28.585,
      lng: 77.385
    }
  ],
  // Default fallback
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
    },
    {
      name: 'Dr. Rita Mehra',
      specialty: 'General Physician',
      rating: 4.4,
      experience: '16 years',
      hospital: 'Safe Care Hospital, Noida',
      phone: '+91 98184 56789',
      address: 'Sector 88, Noida',
      place_id: 'mock_default2',
      lat: 28.535,
      lng: 77.425
    }
  ]
}

