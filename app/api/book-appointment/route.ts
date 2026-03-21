import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

// Mock in-memory storage for bookings (in real app: DB like Prisma/Postgres)
let mockBookings: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  doctorPlaceId: string;
  specialty: string;
  date: string;
  time: string;
  status: 'confirmed';
  createdAt: string;
}> = [];

// Generate simple ID
function generateBookingId(): string {
  return `bk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
}

export async function POST(request: NextRequest) {
  const { user, response } = requireAuth(request)
  if (response) return response

  try {
    const body = await request.json();
    const { name, email, phone, doctorPlaceId, specialty, date, time } = body;

    // Validation
    if (!name || !email || !phone || !doctorPlaceId || !specialty || !date || !time) {
      return NextResponse.json({ error: 'All fields (name, email, phone, doctorPlaceId, specialty, date, time) are required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Phone validation (international E.164 style)
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    if (!/^[\+]?[1-9][\d]{7,15}$/.test(cleanPhone)) {
      return NextResponse.json({ error: 'Valid phone required (+1234567890 format, 8-16 digits)' }, { status: 400 });
    }

    // Date validation (future date)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDate = new Date(date);
    if (bookingDate <= today) {
      return NextResponse.json({ error: 'Booking date must be in the future' }, { status: 400 });
    }

    // Mock: Always available for demo

    // Create booking
    const bookingId = generateBookingId();
    const newBooking = {
      id: bookingId,
      name,
      email,
      phone,
      doctorPlaceId,
      specialty,
      date,
      time,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
    };

    mockBookings.push(newBooking);

    return NextResponse.json({
      success: true,
      bookingId,
      message: `Appointment booked successfully with ${specialty} specialist on ${date} at ${time}. Confirmation sent to ${email}.`,
      booking: newBooking
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server error processing booking' }, { status: 500 });
  }
}

