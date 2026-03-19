import { SymptomChecker } from "@/components/symptom-checker"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              AI-Powered Health Assistant
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Get Instant Health Insights with <span className="text-primary">MediMate</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              Describe your symptoms and receive AI-powered disease predictions, personalized home remedies, and expert
              doctor recommendations - all in seconds.
            </p>
          </div>

          {/* Main Symptom Checker Component */}
          <SymptomChecker />
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Features */}
        <Features />
      </main>

      {/* Footer */}
      <footer className="border-t mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong className="text-foreground">Disclaimer:</strong> MediMate provides AI-powered health information
              for educational purposes only. Always consult with qualified healthcare professionals for medical advice.
            </p>
            <p>© 2025 MediMate. Built with BLACKBOX AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
