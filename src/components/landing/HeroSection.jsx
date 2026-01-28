import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, BookOpen, Award } from "lucide-react"
import heroBg from "@/assets/hero-bg.jpg"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent mb-8 animate-fade-in">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">
              Over 10,000+ students enrolled
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Unlock Your Potential with{" "}
            <span className="text-accent">World-Class</span> Online Learning
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Learn from industry experts, gain practical skills, and advance your
            career with our comprehensive online courses. Start your journey
            today.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4 mb-12 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/courses">
              <Button variant="hero" size="xl">
                Explore Courses
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button variant="heroOutline" size="xl">
                <Play className="w-5 h-5" />
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5 text-accent" />
                <span className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                  500+
                </span>
              </div>
              <span className="text-sm text-primary-foreground/60">
                Expert Courses
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-accent" />
                <span className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                  10K+
                </span>
              </div>
              <span className="text-sm text-primary-foreground/60">
                Active Students
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-accent" />
                <span className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                  95%
                </span>
              </div>
              <span className="text-sm text-primary-foreground/60">
                Success Rate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
