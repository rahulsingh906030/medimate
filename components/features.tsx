import { Card } from "@/components/ui/card"
import { Brain, Shield, Clock, Users, Download, Mic } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    description:
      "Advanced machine learning models trained on extensive medical datasets for accurate disease prediction.",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Get health insights in seconds, not hours. No more waiting for appointments for initial guidance.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your health data is encrypted and never shared. Complete anonymity and data protection.",
  },
  {
    icon: Users,
    title: "Expert Recommendations",
    description: "Receive specialist recommendations based on predicted conditions to find the right doctor.",
  },
  {
    icon: Download,
    title: "Download Reports",
    description: "Generate and download PDF reports to share with your healthcare provider.",
  },
  {
    icon: Mic,
    title: "Voice Input",
    description: "Speak your symptoms naturally using voice recognition for hands-free input.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Better Health</h2>
          <p className="text-muted-foreground">Everything you need for quick, reliable health insights</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-accent/10 rounded-lg p-3 w-fit mb-4">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
