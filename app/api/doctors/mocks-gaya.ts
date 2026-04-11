// Gaya, Bihar mock doctors - base coords 24.6969, 85.0000
// Used when user location detected in Bihar/Gaya region

import { MockDoctor } from './mocks'

export const GAYA_DOCTORS_BY_SPECIALTY: Record<string, MockDoctor[]> = {
  'General Physician': [
    { name: 'Dr. Ram Prasad', specialty: 'General Physician', rating: 4.6, experience: '18+ years', hospital: 'Anand Hospital Gaya', phone: '+91 94314 56789', address: 'Bodhgaya Road, Gaya, Bihar 823001', place_id: 'gaya_gp1', lat: 24.696, lng: 85.001 },
    { name: 'Dr. Suman Devi', specialty: 'General Physician', rating: 4.4, experience: '15 years', hospital: 'Shri Ram Hospital', phone: '+91 95469 12345', address: 'Station Road, Gaya', place_id: 'gaya_gp2', lat: 24.698, lng: 85.002 },
    { name: 'Dr. Ajay Kumar', specialty: 'General Physician', rating: 4.7, experience: '20 years', hospital: 'Gaya Medical College Hospital', phone: '+91 94700 98765', address: 'Piya Mokshpur, Gaya', place_id: 'gaya_gp3', lat: 24.694, lng: 85.000 },
    { name: 'Dr. Rekha Singh', specialty: 'General Physician', rating: 4.5, experience: '12 years', hospital: 'Tara Hospital', phone: '+91 93864 45678', address: 'Civil Lines, Gaya, Bihar', place_id: 'gaya_gp4', lat: 24.697, lng: 84.998 },
    { name: 'Dr. Vinod Yadav', specialty: 'General Physician', rating: 4.8, experience: '22 years', hospital: 'S.K. Medical College', phone: '+91 94312 34567', address: 'Bhagat Singh Road, Gaya', place_id: 'gaya_gp5', lat: 24.695, lng: 85.003 }
  ],
  'Cardiologist': [
    { name: 'Dr. Manoj Kumar', specialty: 'Cardiologist', rating: 4.7, experience: '19 years', hospital: 'Anand Heart Centre Gaya', phone: '+91 94318 76543', address: 'Manpur Road, Gaya', place_id: 'gaya_card1', lat: 24.699, lng: 85.001 },
    { name: 'Dr. Priya Gupta', specialty: 'Cardiologist', rating: 4.6, experience: '16 years', hospital: 'Gaya Heart Hospital', phone: '+91 95461 23456', address: 'Bodhgaya Road, Gaya', place_id: 'gaya_card2', lat: 24.696, lng: 85.004 }
  ],
  'Neurologist': [
    { name: 'Dr. Sanjay Mishra', specialty: 'Neurologist', rating: 4.5, experience: '17 years', hospital: 'Gaya Neuro Centre', phone: '+91 94701 87654', address: 'Piya Mokshpur, Gaya', place_id: 'gaya_neuro1', lat: 24.693, lng: 85.000 },
    { name: 'Dr. Neha Kumari', specialty: 'Neurologist', rating: 4.6, experience: '14 years', hospital: 'Anand Neurological Clinic', phone: '+91 93865 43210', address: 'Station Road, Gaya', place_id: 'gaya_neuro2', lat: 24.697, lng: 85.002 }
  ],
  'Gastroenterologist': [
    { name: 'Dr. Rakesh Singh', specialty: 'Gastroenterologist', rating: 4.6, experience: '20 years', hospital: 'Gastro Liver Hospital Gaya', phone: '+91 94315 67890', address: 'Civil Lines, Gaya', place_id: 'gaya_gastro1', lat: 24.698, lng: 84.999 },
    { name: 'Dr. Anjali Devi', specialty: 'Gastroenterologist', rating: 4.5, experience: '15 years', hospital: 'Tara Gastro Clinic', phone: '+91 95462 34567', address: 'Bhagat Singh Road', place_id: 'gaya_gastro2', lat: 24.694, lng: 85.001 }
  ],
  // Add more as needed...
  default: [
    { name: 'Dr. Local Physician Gaya', specialty: 'General Physician', rating: 4.3, experience: '12 years', hospital: 'Local Clinic Gaya', phone: '+91 94319 01234', address: 'Gaya City Centre, Bihar', place_id: 'gaya_default', lat: 24.6969, lng: 85.0000 }
  ]
}

export function getGayaDoctorsForSpecialty(specialty: string, count: number = 4): MockDoctor[] {
  const base = GAYA_DOCTORS_BY_SPECIALTY[specialty] || GAYA_DOCTORS_BY_SPECIALTY.default || [];
  return base.slice(0, count);
}

