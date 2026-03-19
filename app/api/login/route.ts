import { NextRequest, NextResponse } from 'next/server'
import type { mockUsers } from '../auth/users.js'

declare global {
  var mockUsers: Array<{
    id: number;
    name: string;
    email: string;
    password: string;
  }>;
}

const users = (globalThis as any).mockUsers || []

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = users.find((u: any) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Mock JWT token
    const token = `jwt_${user.id}_${Date.now()}`

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, name: user.name }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
