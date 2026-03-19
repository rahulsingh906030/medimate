"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Activity, FileText, Clock, TrendingUp, Calendar, Download } from "lucide-react"

const RECENT_CHECKS = [
  {
    date: "2024-01-15",
    symptoms: "Fever, headache, body aches",
    prediction: "Common Flu",
    confidence: 85,
  },
  {
    date: "2024-01-10",
    symptoms: "Chest pain, shortness of breath",
    prediction: "Possible Anxiety",
    confidence: 72,
  },
  {
    date: "2024-01-05",
    symptoms: "Stomach pain, nausea",
    prediction: "Gastritis",
    confidence: 78,
  },
]

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Health Dashboard</h1>
            <p className="text-muted-foreground">Track your health checks and medical history</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Checks</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-3">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">This Month</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="bg-accent/10 rounded-lg p-3">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reports</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="bg-chart-3/10 rounded-lg p-3">
                  <FileText className="h-6 w-6 text-chart-3" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Time</p>
                  <p className="text-2xl font-bold">2m</p>
                </div>
                <div className="bg-chart-5/10 rounded-lg p-3">
                  <Clock className="h-6 w-6 text-chart-5" />
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Health Checks */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Health Checks</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {RECENT_CHECKS.map((check, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-muted-foreground">
                        {new Date(check.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                        {check.confidence}% confidence
                      </span>
                    </div>
                    <p className="font-semibold mb-1">{check.prediction}</p>
                    <p className="text-sm text-muted-foreground">{check.symptoms}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          {/* Health Trends */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Health Trends
            </h2>
            <div className="bg-muted/30 rounded-lg p-12 text-center">
              <p className="text-muted-foreground">Health trend visualization will appear here</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
