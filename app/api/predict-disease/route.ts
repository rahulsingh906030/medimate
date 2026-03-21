import { NextResponse } from "next/server"
import type { ConditionData } from "./types"
import predictions from "./smart-predictions.json"
import type { Prediction } from './types'

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

  // Find best matching condition
  let bestMatch: { condition: string, score: number } = { condition: "default", score: 0 }
  
  for (const [condition, data] of Object.entries(predictions.conditions) ) {
    if (condition === "default") continue
    
    const matches = (data as ConditionData).keywords.filter((keyword: string) =>
      lowerSymptoms.includes(keyword.toLowerCase())
    )
    const score = matches.length
    
    if (score > bestMatch.score) {
      bestMatch = { condition, score }
    }
  }

  const defaultData = predictions.conditions.default as ConditionData
  const matchedData = (predictions.conditions[bestMatch.condition as keyof typeof predictions.conditions] as ConditionData) || defaultData
  
  // Adjust confidence based on match strength (max 98%)
  const confidence = Math.min(98, matchedData.confidence + (bestMatch.score * 5))

  return {
    disease: matchedData.disease,
    confidence: Math.round(confidence),
    remedies: matchedData.remedies,
    doctorSpecialty: matchedData.specialty,
    precautions: matchedData.precautions,
  }
}

