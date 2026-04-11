"use client"

import { useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Loader2, AlertCircle, CheckCircle2, Stethoscope, Home, MapPin, Download, Mic, X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

interface PredictionResult {
  disease: string
  confidence: number
  remedies: string[]
  doctorSpecialty: string
  precautions: string[]
}

const COMMON_SYMPTOMS = [
  'Fever',
  'Headache',
  'Cough',
  'Fatigue',
  'Nausea',
  'Chest Pain',
  'Shortness of Breath',
  'Dizziness',
  'Stomach Pain',
  'Muscle Pain',
  'Sore Throat',
]

export function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('')

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [isListening, setIsListening] = useState(false)

  const handleSymptomToggle = useCallback((symptom: string) => {
    console.log('Symptom button clicked:', symptom)
    setSelectedSymptoms((prev) => {
      const newSelected = prev.includes(symptom) 
        ? prev.filter((s) => s !== symptom) 
        : [...prev, symptom]
      console.log('Updated selected symptoms:', newSelected)
      return newSelected
    })
  }, [])

  const handleVoiceInput = () => {
    console.log('Mic clicked')
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        console.log('Voice transcript:', transcript)
        setSymptoms((prev) => prev + (prev ? ' ' : '') + transcript)
      }

      recognition.start()
    } else {
      alert('Voice recognition not supported in your browser')
    }
  }

  const handleAnalyze = async () => {
    const allSymptoms = [symptoms, ...selectedSymptoms].filter(Boolean).join(', ')
    console.log('Analyze clicked, all symptoms:', allSymptoms)

    if (!allSymptoms.trim()) {
      alert('Please enter or select at least one symptom')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/predict-disease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: allSymptoms }),
      })

      const data = await response.json()
      console.log('API response:', data)
      setResult(data)
    } catch (error) {
      console.error('Prediction error:', error)
      alert('Failed to analyze symptoms. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    if (!result) return

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>MediMate Health Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #2563eb; }
            .section { margin: 20px 0; }
            ul { padding-left: 20px; }
          </style>
          </head>
          <body>
            <h1>MediMate Health Report</h1>
            <div class=\\"section\\">
              <h2>Predicted Condition</h2>
              <p><strong>${result.disease}</strong> (${result.confidence}% confidence)</p>
            </div>
            <div class=\\"section\\">
              <h2>Recommended Specialist</h2>
              <p>${result.doctorSpecialty}</p>
            </div>
            <div class=\\"section\\">
              <h2>Home Remedies</h2>
              <ul>${result.remedies.map((r: string) => `<li>${r}</li>`).join('')}</ul>
            </div>
            <div class=\\"section\\">
              <h2>Precautions</h2>
              <ul>${result.precautions.map((p: string) => `<li>${p}</li>`).join('')}</ul>
            </div>
            <p style=\\"margin-top: 40px; font-size: 12px; color: #666;\\" >
              Disclaimer: AI-generated report. Consult healthcare professionals.
            </p>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Card className='p-6 md:p-8 shadow-lg border-0'>
        <div className='space-y-6'>
          <div>
            <label className='block text-sm font-medium mb-2'>Describe Your Symptoms</label>
            <div className='relative'>
              <Textarea
                value={symptoms}
                onChange={(e) => {
                  console.log('Textarea change:', e.target.value)
                  setSymptoms(e.target.value)
                }}
                placeholder='E.g., severe headache, fever, body aches for 2 days...'
                className='min-h-[120px] pr-12 resize-vertical'
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-2 top-2 h-9 w-9 p-0'
                onClick={handleVoiceInput}
              >
                <Mic className={`h-5 w-5 ${isListening ? 'text-destructive animate-pulse' : ''}`} />
              </Button>
            </div>
          </div>

          <div>
            <label className='block text-sm font-semibold mb-4'>Quick Select Common Symptoms</label>
            <div className='flex flex-wrap gap-2'>
              {COMMON_SYMPTOMS.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom)
                return (
                  <Button
                    key={symptom}
                    type='button'
                    variant={isSelected ? 'default' : 'outline'}
                    size='sm'
                    className='cursor-pointer transition-all active:scale-[0.97] px-3 py-1.5 hover:bg-primary/10 touch-manipulation select-none ring-2 ring-primary/50 shadow-md'
                    onClick={() => handleSymptomToggle(symptom)}
                  >
                    {symptom}
                    {isSelected && (
                      <X className='ml-1 h-3 w-3 pointer-events-none flex-shrink-0' />
                    )}
                  </Button>
                )
              })}
            </div>
            {selectedSymptoms.length > 0 && (
              <p className='text-sm text-muted-foreground mt-2'>
                Selected: {selectedSymptoms.join(', ')} ({selectedSymptoms.length})
              </p>
            )}
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={loading} 
            size='lg' 
            className='w-full font-semibold'
          >
            {loading ? (
              <>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                Analyzing...
              </>
            ) : (
              <>
                <Search className='mr-2 h-5 w-5' />
                Analyze Symptoms & Get Predictions
              </>
            )}
          </Button>
        </div>
      </Card>

      {result && (
        <div className='mt-8 space-y-6'>
          <Card className='p-6 border-blue-100 shadow-xl border-2'>
            <div className='flex items-start justify-between mb-4'>
              <div>
                <h3 className='text-xl font-bold mb-2 flex items-center gap-2 text-primary'>
                  <AlertCircle className='h-6 w-6' />
                  Likely Diagnosis
                </h3>
                <p className='text-3xl font-black text-primary mb-1'>{result.disease}</p>
                <p className='text-lg text-primary/80'>Confidence: <strong>{result.confidence}%</strong></p>
              </div>
              <Button onClick={handleDownloadPDF} variant='outline' size='sm' className='shrink-0'>
                <Download className='h-4 w-4 mr-2' />
                PDF Report
              </Button>
            </div>
          </Card>

          <Card className='p-6'>
            <h3 className='text-lg font-semibold mb-3 flex items-center gap-2 text-green-600'>
              <Stethoscope className='h-5 w-5' />
              See Specialist
            </h3>
            <div className='flex items-center justify-between p-4 bg-green-50 rounded-lg'>
              <span className='text-xl font-semibold'>{result.doctorSpecialty}</span>
              <Button variant='default' size='sm'>
                <a href={'/find-doctors?specialty=' + encodeURIComponent(result.doctorSpecialty)}>
                  <MapPin className='h-4 w-4 mr-2' />
                  Find Doctors Now
                </a>
              </Button>
            </div>
          </Card>

          <Card className='p-6 bg-emerald-50'>
            <h3 className='text-lg font-semibold mb-4 flex items-center gap-2 text-emerald-700'>
              <Home className='h-5 w-5' />
              Home Remedies
            </h3>
            <div className='grid gap-3'>
              {result.remedies?.map((remedy, i) => (
                <div key={i} className='flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm'>
                  <CheckCircle2 className='h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0' />
                  <span>{remedy}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className='p-6 bg-orange-50 border-orange-200'>
            <h3 className='text-lg font-semibold mb-4 flex items-center gap-2 text-orange-700'>
              <AlertCircle className='h-5 w-5' />
              Precautions
            </h3>
            <div className='space-y-2'>
              {result.precautions?.map((precaution, i) => (
                <div key={i} className='flex items-start gap-3 p-2 bg-white rounded border-l-4 border-orange-400'>
                  <div className='h-2 w-2 bg-orange-500 rounded-full mt-2 flex-shrink-0' />
                  <span className='text-sm'>{precaution}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
