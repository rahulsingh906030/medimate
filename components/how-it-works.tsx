import { Card } from "@/components/ui/card"
import { FileText, Brain, Stethoscope, MapPin } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Enter Symptoms",
    description: "Describe your symptoms in detail or select from common symptoms. Use voice input for convenience.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI model analyzes your symptoms using machine learning to predict possible conditions.",
  },
  {
    icon: Stethoscope,
    title: "Get Recommendations",
    description: "Receive personalized home remedies, doctor specialty recommendations, and precautions.",
  },
  {
    icon: MapPin,
    title: "Find Care",
    description: "Locate nearby hospitals and specialists. Download your health report for doctor visits.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">Get accurate health insights in four simple steps</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 relative">
              <div className="absolute -top-3 -left-3 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
