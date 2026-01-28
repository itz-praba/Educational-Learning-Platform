import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Users, BookOpen } from "lucide-react"

export function CourseCard({ course, showInstructor = true }) {
  const averageRating = course.average_rating || 4.5
  const enrollmentCount = course.enrollment_count || 0

  return (
    <Link to={`/courses/${course.slug}`}>
      <Card className="group overflow-hidden hover-lift border-border/50 bg-card h-full">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {course.thumbnail_url ? (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-muted-foreground/50" />
            </div>
          )}
          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <Badge
              variant={course.price === 0 ? "secondary" : "default"}
              className="font-semibold shadow-md"
            >
              {course.price === 0 ? "Free" : `$${course.price}`}
            </Badge>
          </div>
          {/* Level Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="outline"
              className="bg-background/80 backdrop-blur-sm capitalize"
            >
              {course.level}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Category */}
          {course.category && (
            <span className="text-xs font-medium text-accent uppercase tracking-wider">
              {course.category.name}
            </span>
          )}

          {/* Title */}
          <h3 className="font-display font-semibold text-lg leading-tight line-clamp-2 group-hover:text-accent transition-colors">
            {course.title}
          </h3>

          {/* Short Description */}
          {course.short_description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {course.short_description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-medium text-foreground">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{enrollmentCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration_hours}h</span>
            </div>
          </div>
        </CardContent>

        {showInstructor && course.instructor && (
          <CardFooter className="px-4 pb-4 pt-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {course.instructor.avatar_url ? (
                  <img
                    src={course.instructor.avatar_url}
                    alt={course.instructor.full_name || ""}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">
                    {course.instructor.full_name?.charAt(0) || "?"}
                  </span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {course.instructor.full_name || "Instructor"}
              </span>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}
