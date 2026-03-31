// Enhanced mock Indian doctors - 13 specialties, 5-8 doctors each for dynamic location generation
// Base Delhi/NCR coords - route.ts will perturb around user location
import { faker } from '@faker-js/faker'; // Optional: for more variety in future

export interface MockDoctor {
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
}

export const MOCK_DOCTORS_BY_SPECIALTY: Record<string, MockDoctor[]> = {
  'General Physician': [
    { name: 'Dr. Rajesh Kumar', specialty: 'General Physician', rating: 4.5, experience: '15+ years', hospital: 'Apollo Clinic Sector 18', phone: '+91 98765 43210', address: 'Sector 18, Noida, UP 201301', place_id: 'mock_gp1', lat: 28.565, lng: 77.395 },
    { name: 'Dr. Anita Sharma', specialty: 'General Physician', rating: 4.3, experience: '12 years', hospital: 'Max Hospital Vaishali', phone: '+91 98123 45678', address: 'Sector 4, Vaishali, Ghaziabad', place_id: 'mock_gp2', lat: 28.645, lng: 77.425 },
    { name: 'Dr. Sanjay Verma', specialty: 'General Physician', rating: 4.6, experience: '18 years', hospital: 'Felix Hospital', phone: '+91 93123 45678', address: 'Sector 137, Noida, UP', place_id: 'mock_gp3', lat: 28.550, lng: 77.410 },
    { name: 'Dr. Priya Singh', specialty: 'General Physician', rating: 4.2, experience: '10 years', hospital: 'Fortis Clinic', phone: '+91 99111 22233', address: 'Sector 62, Noida', place_id: 'mock_gp4', lat: 28.620, lng: 77.380 },
    { name: 'Dr. Vikram Reddy', specialty: 'General Physician', rating: 4.7, experience: '20 years', hospital: 'Jaypee Hospital', phone: '+91 88222 33344', address: 'Sector 128, Noida', place_id: 'mock_gp5', lat: 28.540, lng: 77.385 },
    { name: 'Dr. Meera Joshi', specialty: 'General Physician', rating: 4.4, experience: '14 years', hospital: 'Yatharth Super Speciality', phone: '+91 98777 88899', address: 'Sector 110, Noida Ext', place_id: 'mock_gp6', lat: 28.595, lng: 77.430 }
  ],
  'Cardiologist': [
    { name: 'Dr. Vikram Singh', specialty: 'Cardiologist', rating: 4.7, experience: '20 years', hospital: 'Fortis Hospital Noida', phone: '+91 99111 22233', address: 'Sector 62, Noida, UP 201301', place_id: 'mock_card1', lat: 28.620, lng: 77.380 },
    { name: 'Dr. Neha Gupta', specialty: 'Cardiologist', rating: 4.6, experience: '18 years', hospital: 'Jaypee Hospital Noida', phone: '+91 88222 33344', address: 'Sector 128, Noida', place_id: 'mock_card2', lat: 28.540, lng: 77.385 },
    { name: 'Dr. Amit Patel', specialty: 'Cardiologist', rating: 4.8, experience: '22 years', hospital: 'Max Super Speciality', phone: '+91 99988 77766', address: 'Vaishali, Ghaziabad', place_id: 'mock_card3', lat: 28.650, lng: 77.430 },
    { name: 'Dr. Rina Malhotra', specialty: 'Cardiologist', rating: 4.5, experience: '16 years', hospital: 'Medanta Clinic', phone: '+91 98766 55443', address: 'Sector 47, Noida', place_id: 'mock_card4', lat: 28.580, lng: 77.360 },
    { name: 'Dr. Karan Desai', specialty: 'Cardiologist', rating: 4.9, experience: '25 years', hospital: 'Artemis Hospital', phone: '+91 91234 56789', address: 'Sector 51, Gurgaon nearby', place_id: 'mock_card5', lat: 28.480, lng: 77.055 },
    { name: 'Dr. Shalini Rao', specialty: 'Cardiologist', rating: 4.3, experience: '13 years', hospital: 'Cloudnine Cardiology', phone: '+91 99887 66554', address: 'Sector 14, Noida', place_id: 'mock_card6', lat: 28.535, lng: 77.390 },
    { name: 'Dr. Rohit Bansal', specialty: 'Cardiologist', rating: 4.6, experience: '19 years', hospital: 'BLK Max', phone: '+91 97777 88990', address: 'Sector 20, Noida', place_id: 'mock_card7', lat: 28.575, lng: 77.415 }
  ],
  'Neurologist': [
    { name: 'Dr. Arjun Patel', specialty: 'Neurologist', rating: 4.4, experience: '16 years', hospital: 'Yatharth Hospital Noida', phone: '+91 98777 88899', address: 'Sector 110, Noida Ext, UP', place_id: 'mock_neuro1', lat: 28.595, lng: 77.430 },
    { name: 'Dr. Pooja Mehta', specialty: 'Neurologist', rating: 4.6, experience: '17 years', hospital: 'Pragati Neuro Centre', phone: '+91 98111 22334', address: 'Sector 27, Noida', place_id: 'mock_neuro2', lat: 28.600, lng: 77.420 },
    { name: 'Dr. Sameer Khan', specialty: 'Neurologist', rating: 4.8, experience: '21 years', hospital: 'Max Neuro Dept', phone: '+91 99112 33445', address: 'Vaishali, Ghaziabad', place_id: 'mock_neuro3', lat: 28.640, lng: 77.420 },
    { name: 'Dr. Nisha Agarwal', specialty: 'Neurologist', rating: 4.5, experience: '15 years', hospital: 'Felix Neuro Wing', phone: '+91 98788 99001', address: 'Sector 137, Noida', place_id: 'mock_neuro4', lat: 28.545, lng: 77.405 },
    { name: 'Dr. Rajiv Nair', specialty: 'Neurologist', rating: 4.7, experience: '23 years', hospital: 'Jaypee Neurology', phone: '+91 91222 33445', address: 'Sector 128, Noida', place_id: 'mock_neuro5', lat: 28.535, lng: 77.380 }
  ],
  'Dermatologist': [
    { name: 'Dr. Kavita Reddy', specialty: 'Dermatologist', rating: 4.8, experience: '10 years', hospital: 'Kaya Skin Clinic', phone: '+91 99999 00000', address: 'DLF Mall, Sector 18, Noida', place_id: 'mock_derm1', lat: 28.570, lng: 77.400 },
    { name: 'Dr. Sunita Bose', specialty: 'Dermatologist', rating: 4.9, experience: '12 years', hospital: 'Dr. Batra\'s Skin Clinic', phone: '+91 98765 12345', address: 'Sector 18, Noida', place_id: 'mock_derm2', lat: 28.565, lng: 77.395 },
    { name: 'Dr. Vikrant Ahuja', specialty: 'Dermatologist', rating: 4.6, experience: '14 years', hospital: 'Skinzest Clinic', phone: '+91 98111 11111', address: 'Sector 50, Noida', place_id: 'mock_derm3', lat: 28.590, lng: 77.370 },
    { name: 'Dr. Ayesha Khan', specialty: 'Dermatologist', rating: 4.7, experience: '11 years', hospital: 'LA Skin Clinic', phone: '+91 99111 98765', address: 'Atta Market, Sector 27', place_id: 'mock_derm4', lat: 28.605, lng: 77.425 },
    { name: 'Dr. Manoj Gupta', specialty: 'Dermatologist', rating: 4.5, experience: '16 years', hospital: 'Richfeel Trichology', phone: '+91 99999 11111', address: 'Sector 18 Commercial', place_id: 'mock_derm5', lat: 28.570, lng: 77.390 },
    { name: 'Dr. Radhika Sen', specialty: 'Dermatologist', rating: 4.8, experience: '13 years', hospital: 'Cosmo Care', phone: '+91 98766 78901', address: 'Sector 62, Noida', place_id: 'mock_derm6', lat: 28.620, lng: 77.380 }
  ],
  'Orthopedic': [
    { name: 'Dr. Ashok Kumar', specialty: 'Orthopedic', rating: 4.7, experience: '25 years', hospital: 'Fortis Ortho Centre', phone: '+91 99110 10101', address: 'Sector 62, Noida', place_id: 'mock_ortho1', lat: 28.620, lng: 77.380 },
    { name: 'Dr. Rekha Mistry', specialty: 'Orthopedic', rating: 4.5, experience: '18 years', hospital: 'Bone & Joint Clinic', phone: '+91 98112 34567', address: 'Sector 27, Noida', place_id: 'mock_ortho2', lat: 28.600, lng: 77.420 },
    { name: 'Dr. Pradeep Jain', specialty: 'Orthopedic', rating: 4.8, experience: '22 years', hospital: 'Max Orthopaedics', phone: '+91 98765 09876', address: 'Vaishali, Ghaziabad', place_id: 'mock_ortho3', lat: 28.645, lng: 77.425 },
    { name: 'Dr. Suman Lata', specialty: 'Orthopedic', rating: 4.6, experience: '15 years', hospital: 'Park Hospital Ortho', phone: '+91 91234 56789', address: 'Sector 47, Noida', place_id: 'mock_ortho4', lat: 28.580, lng: 77.360 },
    { name: 'Dr. Rohan Sethi', specialty: 'Orthopedic', rating: 4.9, experience: '20 years', hospital: 'Joint Replacement Centre', phone: '+91 99876 54321', address: 'Sector 51, Noida', place_id: 'mock_ortho5', lat: 28.565, lng: 77.370 },
    { name: 'Dr. Neeraj Dubey', specialty: 'Orthopedic', rating: 4.4, experience: '17 years', hospital: 'Felix Bone Clinic', phone: '+91 93123 45678', address: 'Sector 137, Noida', place_id: 'mock_ortho6', lat: 28.550, lng: 77.410 },
    { name: 'Dr. Kiran Verma', specialty: 'Orthopedic', rating: 4.7, experience: '19 years', hospital: 'Yatharth Ortho', phone: '+91 98777 88899', address: 'Sector 110, Noida Ext', place_id: 'mock_ortho7', lat: 28.595, lng: 77.430 },
    { name: 'Dr. Anil Sharma', specialty: 'Orthopedic', rating: 4.6, experience: '16 years', hospital: 'Noida Bone Specialists', phone: '+91 99111 22233', address: 'Sector 18, Noida', place_id: 'mock_ortho8', lat: 28.565, lng: 77.395 }
  ],
  'Pediatrician': [
    { name: 'Dr. Ritu Chopra', specialty: 'Pediatrician', rating: 4.8, experience: '14 years', hospital: 'Apollo Childrens Clinic', phone: '+91 98765 43211', address: 'Sector 18, Noida', place_id: 'mock_ped1', lat: 28.570, lng: 77.400 },
    { name: 'Dr. Vivek Oberoi', specialty: 'Pediatrician', rating: 4.6, experience: '12 years', hospital: 'Max Kids Clinic', phone: '+91 98123 45679', address: 'Vaishali, Ghaziabad', place_id: 'mock_ped2', lat: 28.645, lng: 77.425 },
    { name: 'Dr. Anjali Rao', specialty: 'Pediatrician', rating: 4.9, experience: '16 years', hospital: 'Cloudnine Hospital', phone: '+91 99111 22234', address: 'Sector 47, Noida', place_id: 'mock_ped3', lat: 28.580, lng: 77.360 },
    { name: 'Dr. Sanjay Malik', specialty: 'Pediatrician', rating: 4.7, experience: '18 years', hospital: 'Felix Child Care', phone: '+91 98777 88900', address: 'Sector 137, Noida', place_id: 'mock_ped4', lat: 28.550, lng: 77.410 },
    { name: 'Dr. Megha Kapoor', specialty: 'Pediatrician', rating: 4.5, experience: '11 years', hospital: 'Yatharth Pediatrics', phone: '+91 91234 56780', address: 'Sector 110, Noida Ext', place_id: 'mock_ped5', lat: 28.595, lng: 77.430 },
    { name: 'Dr. Arnav Sen', specialty: 'Pediatrician', rating: 4.8, experience: '13 years', hospital: 'Little Angels Clinic', phone: '+91 99988 77665', address: 'Sector 62, Noida', place_id: 'mock_ped6', lat: 28.620, lng: 77.380 }
  ],
  'Psychiatrist': [
    { name: 'Dr. Mona Khanna', specialty: 'Psychiatrist', rating: 4.7, experience: '17 years', hospital: 'Manastha Mind Clinic', phone: '+91 98111 22335', address: 'Sector 27, Noida', place_id: 'mock_psy1', lat: 28.600, lng: 77.420 },
    { name: 'Dr. Rajat Tandon', specialty: 'Psychiatrist', rating: 4.6, experience: '15 years', hospital: 'Hope Mental Health', phone: '+91 99112 33446', address: 'Sector 50, Noida', place_id: 'mock_psy2', lat: 28.590, lng: 77.370 },
    { name: 'Dr. Shweta Verma', specialty: 'Psychiatrist', rating: 4.8, experience: '19 years', hospital: 'Max Psychiatry Dept', phone: '+91 98765 12347', address: 'Vaishali, Ghaziabad', place_id: 'mock_psy3', lat: 28.645, lng: 77.425 },
    { name: 'Dr. Vikash Roy', specialty: 'Psychiatrist', rating: 4.5, experience: '14 years', hospital: 'Noida Mind Centre', phone: '+91 91222 33446', address: 'Sector 18, Noida', place_id: 'mock_psy4', lat: 28.565, lng: 77.395 },
    { name: 'Dr. Priyanka Das', specialty: 'Psychiatrist', rating: 4.9, experience: '20 years', hospital: 'Artemis Mental Wellness', phone: '+91 99876 54322', address: 'Sector 51 nearby', place_id: 'mock_psy5', lat: 28.480, lng: 77.055 }
  ],
  'ENT Specialist': [
    { name: 'Dr. Anil Bansal', specialty: 'ENT Specialist', rating: 4.6, experience: '16 years', hospital: 'Apollo ENT Clinic', phone: '+91 98765 43212', address: 'Sector 18, Noida', place_id: 'mock_ent1', lat: 28.570, lng: 77.400 },
    { name: 'Dr. Sangeeta Jain', specialty: 'ENT Specialist', rating: 4.7, experience: '18 years', hospital: 'Max ENT Centre', phone: '+91 98123 45680', address: 'Vaishali, Ghaziabad', place_id: 'mock_ent2', lat: 28.645, lng: 77.425 },
    { name: 'Dr. Rohit Kapoor', specialty: 'ENT Specialist', rating: 4.8, experience: '20 years', hospital: 'Felix ENT Dept', phone: '+91 99111 22235', address: 'Sector 137, Noida', place_id: 'mock_ent3', lat: 28.550, lng: 77.410 },
    { name: 'Dr. Neha Batra', specialty: 'ENT Specialist', rating: 4.5, experience: '13 years', hospital: 'Yatharth ENT', phone: '+91 98777 88901', address: 'Sector 110, Noida Ext', place_id: 'mock_ent4', lat: 28.595, lng: 77.430 },
    { name: 'Dr. Amit Saxena', specialty: 'ENT Specialist', rating: 4.9, experience: '22 years', hospital: 'Noida ENT Specialists', phone: '+91 91234 56781', address: 'Sector 62, Noida', place_id: 'mock_ent5', lat: 28.620, lng: 77.380 },
    { name: 'Dr. Kavya Singh', specialty: 'ENT Specialist', rating: 4.6, experience: '15 years', hospital: 'Jaypee ENT', phone: '+91 99988 77666', address: 'Sector 128, Noida', place_id: 'mock_ent6', lat: 28.540, lng: 77.385 }
  ],
  'Gynecologist': [
    { name: 'Dr. Ruchi Tandon', specialty: 'Gynecologist', rating: 4.8, experience: '19 years', hospital: 'Cloudnine Hospital', phone: '+91 99111 22336', address: 'Sector 47, Noida', place_id: 'mock_gyne1', lat: 28.580, lng: 77.360 },
    { name: 'Dr. Manisha Aggarwal', specialty: 'Gynecologist', rating: 4.7, experience: '17 years', hospital: 'Apollo Cradle', phone: '+91 98765 12348', address: 'Sector 18, Noida', place_id: 'mock_gyne2', lat: 28.565, lng: 77.395 },
    { name: 'Dr. Sanjana Reddy', specialty: 'Gynecologist', rating: 4.9, experience: '21 years', hospital: 'Fortis La Femme', phone: '+91 98112 34568', address: 'Sector 62 nearby', place_id: 'mock_gyne3', lat: 28.620, lng: 77.380 },
    { name: 'Dr. Puneet Kaur', specialty: 'Gynecologist', rating: 4.6, experience: '14 years', hospital: 'Yatharth Women Care', phone: '+91 91222 33447', address: 'Sector 110, Noida Ext', place_id: 'mock_gyne4', lat: 28.595, lng: 77.430 },
    { name: 'Dr. Vishakha Goel', specialty: 'Gynecologist', rating: 4.8, experience: '16 years', hospital: 'Felix Gynecology', phone: '+91 99876 54323', address: 'Sector 137, Noida', place_id: 'mock_gyne5', lat: 28.550, lng: 77.410 }
  ],
  'Ophthalmologist': [
    { name: 'Dr. Vinay Agrawal', specialty: 'Ophthalmologist', rating: 4.7, experience: '18 years', hospital: 'Laxmi Eye Institute', phone: '+91 98765 43213', address: 'Sector 27, Noida', place_id: 'mock_oph1', lat: 28.600, lng: 77.420 },
    { name: 'Dr. Anuradha Verma', specialty: 'Ophthalmologist', rating: 4.8, experience: '20 years', hospital: 'Centre for Sight', phone: '+91 98123 45681', address: 'Sector 18, Noida', place_id: 'mock_oph2', lat: 28.570, lng: 77.400 },
    { name: 'Dr. Sameer Seth', specialty: 'Ophthalmologist', rating: 4.9, experience: '24 years', hospital: 'Sharp Sight Eye Hospital', phone: '+91 99111 22236', address: 'Sector 50, Noida', place_id: 'mock_oph3', lat: 28.590, lng: 77.370 },
    { name: 'Dr. Rita Bakshi', specialty: 'Ophthalmologist', rating: 4.6, experience: '15 years', hospital: 'Eye Mantra', phone: '+91 98777 88902', address: 'Vaishali, Ghaziabad', place_id: 'mock_oph4', lat: 28.645, lng: 77.425 },
    { name: 'Dr. Karan Ahluwalia', specialty: 'Ophthalmologist', rating: 4.7, experience: '17 years', hospital: 'Noida Eye Centre', phone: '+91 91234 56782', address: 'Sector 62, Noida', place_id: 'mock_oph5', lat: 28.620, lng: 77.380 },
    { name: 'Dr. Pooja Mehra', specialty: 'Ophthalmologist', rating: 4.8, experience: '19 years', hospital: 'Felix Eye Clinic', phone: '+91 99988 77667', address: 'Sector 137, Noida', place_id: 'mock_oph6', lat: 28.550, lng: 77.410 }
  ],
  'General': [
    { name: 'Dr. Naresh Gupta', specialty: 'General', rating: 4.4, experience: '13 years', hospital: 'General Health Clinic', phone: '+91 98765 43214', address: 'Sector 18, Noida', place_id: 'mock_genl1', lat: 28.565, lng: 77.395 },
    { name: 'Dr. Lakshmi Nair', specialty: 'General', rating: 4.5, experience: '15 years', hospital: 'Multi Speciality Centre', phone: '+91 98123 45682', address: 'Sector 62, Noida', place_id: 'mock_genl2', lat: 28.620, lng: 77.380 },
    { name: 'Dr. Baldev Singh', specialty: 'General', rating: 4.6, experience: '22 years', hospital: 'People Care Clinic', phone: '+91 99111 22237', address: 'Vaishali, Ghaziabad', place_id: 'mock_genl3', lat: 28.645, lng: 77.425 },
    { name: 'Dr. Tarun Sharma', specialty: 'General', rating: 4.3, experience: '12 years', hospital: 'Felix General', phone: '+91 98777 88903', address: 'Sector 137, Noida', place_id: 'mock_genl4', lat: 28.550, lng: 77.410 },
    { name: 'Dr. Suman Lamba', specialty: 'General', rating: 4.7, experience: '18 years', hospital: 'Yatharth General Dept', phone: '+91 91234 56783', address: 'Sector 110, Noida Ext', place_id: 'mock_genl5', lat: 28.595, lng: 77.430 }
  ],
  'Dentist': [
    { name: 'Dr. Rohan Malhotra', specialty: 'Dentist', rating: 4.8, experience: '11 years', hospital: 'Clove Dental', phone: '+91 99999 00001', address: 'Sector 18, Noida', place_id: 'mock_dent1', lat: 28.570, lng: 77.400 },
    { name: 'Dr. Nikita Sabharwal', specialty: 'Dentist', rating: 4.9, experience: '13 years', hospital: 'Dental Bliss', phone: '+91 98765 12349', address: 'Sector 27, Noida', place_id: 'mock_dent2', lat: 28.600, lng: 77.420 },
    { name: 'Dr. Vikram Dental', specialty: 'Dentist', rating: 4.7, experience: '16 years', hospital: 'Noida Dental Hub', phone: '+91 98112 34569', address: 'Sector 50, Noida', place_id: 'mock_dent3', lat: 28.590, lng: 77.370 },
    { name: 'Dr. Ankit Chopra', specialty: 'Dentist', rating: 4.6, experience: '14 years', hospital: 'Max Dental Care', phone: '+91 99111 98766', address: 'Vaishali, Ghaziabad', place_id: 'mock_dent4', lat: 28.645, lng: 77.425 },
    { name: 'Dr. Smriti Ahuja', specialty: 'Dentist', rating: 4.8, experience: '12 years', hospital: 'Smile Dental Clinic', phone: '+91 91222 33448', address: 'Sector 62, Noida', place_id: 'mock_dent5', lat: 28.620, lng: 77.380 },
    { name: 'Dr. Parag Goel', specialty: 'Dentist', rating: 4.7, experience: '15 years', hospital: 'Felix Dental', phone: '+91 99876 54324', address: 'Sector 137, Noida', place_id: 'mock_dent6', lat: 28.550, lng: 77.410 },
    { name: 'Dr. Neetu Singh', specialty: 'Dentist', rating: 4.9, experience: '17 years', hospital: 'Advanced Dental Care', phone: '+91 99988 77668', address: 'Sector 18 Commercial', place_id: 'mock_dent7', lat: 28.565, lng: 77.395 }
  ],
  'Gastroenterologist': [
    { name: 'Dr. Alok Jaiswal', specialty: 'Gastroenterologist', rating: 4.7, experience: '20 years', hospital: 'Max Gastro Centre', phone: '+91 98765 43215', address: 'Vaishali, Ghaziabad', place_id: 'mock_gastro1', lat: 28.645, lng: 77.425 },
    { name: 'Dr. Vandana Sharma', specialty: 'Gastroenterologist', rating: 4.6, experience: '16 years', hospital: 'Felix Gastro Dept', phone: '+91 98123 45683', address: 'Sector 137, Noida', place_id: 'mock_gastro2', lat: 28.550, lng: 77.410 },
    { name: 'Dr. Rajendra Gupta', specialty: 'Gastroenterologist', rating: 4.8, experience: '24 years', hospital: 'Yatharth Gastro', phone: '+91 99111 22238', address: 'Sector 110, Noida Ext', place_id: 'mock_gastro3', lat: 28.595, lng: 77.430 },
    { name: 'Dr. Anjali Mehrotra', specialty: 'Gastroenterologist', rating: 4.5, experience: '14 years', hospital: 'Jaypee Gastro Clinic', phone: '+91 98777 88904', address: 'Sector 128, Noida', place_id: 'mock_gastro4', lat: 28.540, lng: 77.385 },
    { name: 'Dr. Sunil Chawla', specialty: 'Gastroenterologist', rating: 4.9, experience: '22 years', hospital: 'Fortis Gastroenterology', phone: '+91 91234 56784', address: 'Sector 62, Noida', place_id: 'mock_gastro5', lat: 28.620, lng: 77.380 },
    { name: 'Dr. Kirti Bhatia', specialty: 'Gastroenterologist', rating: 4.7, experience: '18 years', hospital: 'BLK Gastro Specialists', phone: '+91 99988 77669', address: 'Sector 20, Noida', place_id: 'mock_gastro6', lat: 28.575, lng: 77.415 }
  ],
  // Fallback for unknown specialties
  default: [
    { name: 'Dr. Default Physician', specialty: 'General Physician', rating: 4.0, experience: '10 years', hospital: 'Local Clinic', phone: '+91 99999 99999', address: 'Nearby Clinic', place_id: 'mock_default', lat: 28.5355, lng: 77.3910 }
  ]
}

// Helper to get random doctors (5-8) for dynamic use
export function getMockDoctorsForSpecialty(specialty: string, count: number = 6): MockDoctor[] {
  const base = MOCK_DOCTORS_BY_SPECIALTY[specialty] || MOCK_DOCTORS_BY_SPECIALTY.default || [];
  return base.slice(0, count);
}

