"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2, AlertCircle, CheckCircle2, Stethoscope, Home, MapPin, Download, Mic, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"



interface PredictionResult {
  disease: string
  confidence: number
  remedies: string[]
  doctorSpecialty: string
  precautions: string[]
}

const COMMON_SYMPTOMS = [
  "Fever",
  "Headache",
  "Cough",
  "Fatigue",
  "Nausea",
  "Chest Pain",
  "Shortness of Breath",
  "Dizziness",
  "Stomach Pain",
  "Muscle Pain",
  "Sore Throat",
]

export function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [isListening, setIsListening] = useState(false)

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((prev) => (prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]))
  }

  const handleVoiceInput = () => {
    const SpeechRecognitionClass = window.webkitSpeechRecognition || window.SpeechRecognition
    if (SpeechRecognitionClass) {
      const recognition = new SpeechRecognitionClass()

      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSymptoms((prev) => prev + (prev ? " " : "") + transcript)
      }

      recognition.start()
    } else {
      alert("Voice recognition not supported in your browser")
    }
  }

  const handleAnalyze = async () => {
    const allSymptoms = [symptoms, ...selectedSymptoms].filter(Boolean).join(", ")

    if (!allSymptoms.trim()) {
      alert("Please enter or select at least one symptom")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/predict-disease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: allSymptoms }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      // Network or API error
      alert("Failed to analyze symptoms. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    if (!result) return

    // In a real implementation, this would generate a proper PDF
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>MediMate Health Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              h1 { color: #2563eb; }
              .section { margin: 20px 0; }
              .badge { background: #e0f2fe; padding: 4px 8px; border-radius: 4px; }
            </style>
          </head>
          <body>
            <h1>MediMate Health Report</h1>
            <div class="section">
              <h2>Predicted Condition</h2>
              <p><strong>${result.disease}</strong> (${result.confidence}% confidence)</p>
            </div>
            <div class="section">
              <h2>Recommended Specialist</h2>
              <p>${result.doctorSpecialty}</p>
            </div>
            <div class="section">
              <h2>Home Remedies</h2>
              <ul>
                ${result.remedies.map((r) => `<li>${r}</li>`).join("")}
              </ul>
            </div>
            <div class="section">
              <h2>Precautions</h2>
              <ul>
                ${result.precautions.map((p) => `<li>${p}</li>`).join("")}
              </ul>
            </div>
            <p style="margin-top: 40px; font-size: 12px; color: #666;">
              Disclaimer: This is an AI-generated report. Always consult healthcare professionals.
            </p>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 md:p-8 shadow-lg">
        <div className="space-y-6">
          {/* Symptom Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Describe Your Symptoms</label>
            <div className="relative">
              <Textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="E.g., I have a severe headache, fever, and body aches for the last 2 days..."
                className="min-h-[120px] pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2"
                onClick={handleVoiceInput}
              >
                <Mic className={`h-5 w-5 ${isListening ? "text-destructive animate-pulse" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Quick Select Symptoms */}
          <div>
            <label className="block text-sm font-medium mb-3">Or Select Common Symptoms</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map((symptom) => (
                <Badge
                  key={symptom}
                  variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1.5"
                  onClick={() => handleSymptomToggle(symptom)}
                >
                  {symptom}
                  {selectedSymptoms.includes(symptom) && <X className="ml-1 h-3 w-3" />}
                </Badge>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <Button onClick={handleAnalyze} disabled={loading} size="lg" className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Analyze Symptoms
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Results */}
      {result && (
        <div className="mt-8 space-y-6 animate-fade-in">
          {/* Prediction Result */}
          <Card className="p-6 border-primary/30 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  Predicted Condition
                </h3>
                <p className="text-3xl font-bold text-primary">{result.disease}</p>
                <p className="text-sm text-muted-foreground mt-1">Confidence: {result.confidence}%</p>
              </div>
              <Button onClick={handleDownloadPDF} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </Card>

          {/* Doctor Recommendation */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-accent" />
              Recommended Specialist
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-xl font-medium text-accent">{result.doctorSpecialty}</p>
              <Button variant="outline" asChild>
                <a href={`/find-doctors?specialty=${encodeURIComponent(result!.doctorSpecialty)}`}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Nearby {result!.doctorSpecialty} Doctors
                </a>
              </Button>
            </div>
          </Card>

          {/* Home Remedies */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Home className="h-5 w-5 text-chart-3" />
              Home Remedies & Self-Care
            </h3>
            <ul className="space-y-2">
              {result.remedies && Array.isArray(result.remedies) && result.remedies.map((remedy, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-chart-3 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{remedy}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Precautions */}
          <Card className="p-6 bg-muted/30">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Important Precautions
            </h3>
            <ul className="space-y-2">
              {result.precautions && Array.isArray(result.precautions) && result.precautions.map((precaution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 bg-destructive rounded-full flex-shrink-0 mt-2" />
                  <span className="text-sm">{precaution}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  )
}
