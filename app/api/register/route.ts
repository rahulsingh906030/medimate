import { NextRequest, NextResponse } from 'next/server'
import { readUsers, writeUsers, getNextId, type User } from '../auth/users'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    const users = readUsers()
    
    // Check if user exists
    if (users.find((u: User) => u.email === email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    // Create new user
    const newId = getNextId()
    const newUser: User = {
      id: newId,
      name,
      email,
      password // In real app, hash
    }

    users.push(newUser)
    writeUsers(users)

    // Mock token
    const token = `jwt_${newUser.id}_${Date.now()}`

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: newUser,
      token
    })
  } catch (error) {
    // Silent error handling - JSON parse or users file issue
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
