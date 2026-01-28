import { Link } from "react-router-dom"
import { GraduationCap, Mail, Twitter, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-xl">LearnHub</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Empowering learners worldwide with high-quality online education.
              Start your learning journey today.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/courses"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/instructors"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Instructors
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/blog"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/terms"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibility"
                  className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
