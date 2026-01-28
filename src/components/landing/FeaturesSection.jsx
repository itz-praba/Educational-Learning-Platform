import {
  CheckCircle2,
  Zap,
  Shield,
  Globe,
  HeadphonesIcon,
  Award
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Learn at Your Pace",
    description:
      "Access courses anytime, anywhere. Learn on your schedule with lifetime access to all enrolled courses."
  },
  {
    icon: Award,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with real-world experience and proven track records."
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "All courses are vetted for quality. If you're not satisfied, get a full refund within 30 days."
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "Join thousands of learners worldwide. Collaborate, network, and grow together."
  },
  {
    icon: CheckCircle2,
    title: "Verified Certificates",
    description:
      "Earn recognized certificates upon completion. Showcase your skills to employers."
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our dedicated support team is always here to help you succeed in your learning journey."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why Choose LearnHub?
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            We're committed to providing the best learning experience possible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
