import { NextResponse } from "next/server"
import predictions from "./smart-predictions.json"

interface Prediction {
  disease: string
  confidence: number
  remedies: string[]
  doctorSpecialty: string
  precautions: string[]
}

// Smart symptom-based disease prediction (no external API needed)
export async function POST(req: Request) {
  try {
    const { symptoms } = await req.json()

    if (!symptoms || typeof symptoms !== "string" || !symptoms.trim()) {
      return NextResponse.json({ 
        error: "Symptoms are required" 
      }, { status: 400 })
    }

    const prediction = getSmartPrediction(symptoms)
    return NextResponse.json(prediction)

  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({
      disease: "Consult a Doctor",
      confidence: 50,
      remedies: ["Monitor symptoms", "Stay hydrated", "Rest"],
      doctorSpecialty: "General Physician",
      precautions: ["Seek professional advice", "Don't ignore new symptoms"]
    }, { status: 500 })
  }
}

function getSmartPrediction(symptoms: string): Prediction {
  const lowerSymptoms = symptoms.toLowerCase().replace(/[^\w\s]/g, '')

  // Define condition data with proper typing
  type ConditionData = {
    keywords: string[]
    disease: string
    confidence: number
    specialty: string
    remedies: string[]
    precautions: string[]
  }

  // Find best matching condition
  let bestMatch: { condition: string, score: number } = { condition: "default", score: 0 }
  
  for (const [condition, data] of Object.entries(predictions.conditions) as [string, ConditionData][]) {
    if (condition === "default") continue
    
    const matches = (data as ConditionData).keywords.filter((keyword: string) => 
      lowerSymptoms.includes(keyword.toLowerCase())
    )
    const score = matches.length
    
    if (score > bestMatch.score) {
      bestMatch = { condition, score }
    }
  }

  const matchedData = predictions.conditions[bestMatch.condition as keyof typeof predictions.conditions] as ConditionData
  
  // Adjust confidence based on match strength (max 95%)
const confidence = Math.min(98, matchedData.confidence + (bestMatch.score * 5))

  return {
    disease: matchedData.disease,
    confidence: Math.round(confidence),
    remedies: matchedData.remedies,
    doctorSpecialty: matchedData.specialty,
    precautions: matchedData.precautions,
  }
}
