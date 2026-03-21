export interface ConditionData {
  keywords: string[]
  disease: string
  confidence: number
  specialty: string
  remedies: string[]
  precautions: string[]
}

export interface Prediction {
  disease: string
  confidence: number
  remedies: string[]
  doctorSpecialty: string
  precautions: string[]
}
