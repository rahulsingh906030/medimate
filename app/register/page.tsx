"use client"

import type { FormEvent } from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error || 'Registration failed')
        return
      }
      // Auto-login after register
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-primary rounded-lg p-3 w-fit mx-auto mb-4">
            <Activity className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Create Account</h1>
          <p className="text-muted-foreground">Get started with MediMate today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
        {error && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}


