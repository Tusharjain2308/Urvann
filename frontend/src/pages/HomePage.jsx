import { Button } from "../components/ui/Button.jsx"
import { Leaf } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4 shadow-lg">
          <Leaf className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-foreground">Welcome to Urvann</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Your botanical paradise awaits. Discover the perfect plants for your space.
        </p>
        <div className="space-y-4">
          <a href="/auth">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Get Started
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
