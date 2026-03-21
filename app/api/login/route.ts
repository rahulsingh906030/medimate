import { NextRequest, NextResponse } from 'next/server'
import { readUsers } from '../auth/users'
import type { User } from '../auth/users'

const users = readUsers()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = users.find((u: User) => u.email === email && u.password === password)

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
    // Silent error handling - JSON parse or validation failed
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
