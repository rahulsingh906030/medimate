import { NextRequest, NextResponse } from 'next/server'

declare global {
  var mockUsers: Array<{
    id: number;
    name: string;
    email: string;
    password: string;
  }>;
}

let users = (globalThis as any).mockUsers || [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'user@example.com',
    password: 'password'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'test@example.com',
    password: 'test123'
  }
]

if (!(globalThis as any).mockUsers) {
  (globalThis as any).mockUsers = users
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Check if user exists
    if (users.find((u: any) => u.email === email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    // Create new user
    const newId = users.length + 1
    const newUser = {
      id: newId,
      name,
      email,
      password // In real app, hash
    }

    users.push(newUser)

    // Mock token
    const token = `jwt_${newUser.id}_${Date.now()}`

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: newUser,
      token
    })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
