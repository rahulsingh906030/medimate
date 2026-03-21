import { readUsers, type User } from '@/app/api/auth/users'
import { NextRequest } from 'next/server'

// Client-side token check (simple existence check)
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token')
}

// Server-side token verification (mock JWT validation)
export function verifyToken(token: string): User | null {

  if (!token || !token.startsWith('jwt_')) {
    console.error('verifyToken: Invalid format')
    return null
  }
  
  try {
    // Mock validation: extract userId from token
    const tokenParts = token.split('_')
    const userId = parseInt(tokenParts[1])
    if (isNaN(userId)) {
      console.error('verifyToken: Invalid userId', tokenParts[1])
      return null
    }
    
    const users = readUsers()

    const user = users.find(u => u.id === userId)
    if (!user) {
      console.error('verifyToken: User not found ID:', userId)
    }
    return user || null
  } catch (e) {
    console.error('verifyToken error:', e)
    return null
  }
}

// Server-side auth middleware helper
export function requireAuth(request: NextRequest): { user: User | null, response: Response | null } {
  const authHeader = request.headers.get('authorization')

  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('requireAuth: Missing/invalid Bearer token')
    return { 
      user: null, 
      response: new Response(JSON.stringify({ error: 'Unauthorized - Bearer token required' }), { 
        status: 401, 
        headers: { 'WWW-Authenticate': 'Bearer' } 
      }) 
    }
  }
  
  const token = authHeader.slice(7) // Remove 'Bearer '
  const user = verifyToken(token)
  
  if (!user) {
    return { 
      user: null, 
      response: new Response(JSON.stringify({ error: 'Invalid token - user not found' }), { status: 401 }) 
    }
  }
  

  return { user, response: null }
}

