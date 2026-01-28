import { Link } from "react-router-dom"
import {
  Code,
  BarChart3,
  Palette,
  Briefcase,
  TrendingUp,
  Camera,
  Music,
  Target
} from "lucide-react"

const iconMap = {
  Code: Code,
  BarChart: BarChart3,
  Palette: Palette,
  Briefcase: Briefcase,
  TrendingUp: TrendingUp,
  Camera: Camera,
  Music: Music,
  Target: Target
}

export function CategoryCard({ category, courseCount = 0 }) {
  const IconComponent = iconMap[category.icon || "Code"] || Code

  return (
    <Link to={`/courses?category=${category.slug}`}>
      <div className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
          <IconComponent className="w-7 h-7 text-accent" />
        </div>

        {/* Content */}
        <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {category.description}
        </p>
        <span className="text-xs font-medium text-muted-foreground">
          {courseCount} courses
        </span>

        {/* Hover gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  )
}
