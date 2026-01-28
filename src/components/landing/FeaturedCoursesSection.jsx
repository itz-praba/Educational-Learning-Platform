import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/courses/CourseCard"
import { ArrowRight } from "lucide-react"

// Sample courses for demo
const sampleCourses = [
  {
    id: "1",
    instructor_id: "1",
    category_id: "1",
    title: "Complete Web Development Bootcamp 2024",
    slug: "complete-web-development-bootcamp",
    description:
      "Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more.",
    short_description:
      "Master full-stack web development with hands-on projects and real-world applications.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
    price: 89.99,
    status: "published",
    level: "beginner",
    duration_hours: 45,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    average_rating: 4.8,
    enrollment_count: 3420,
    category: {
      id: "1",
      name: "Web Development",
      slug: "web-development",
      description: null,
      icon: "Code",
      created_at: ""
    },
    instructor: {
      id: "1",
      user_id: "1",
      full_name: "Sarah Johnson",
      avatar_url:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      bio: null,
      website: null,
      created_at: "",
      updated_at: ""
    }
  },
  {
    id: "2",
    instructor_id: "2",
    category_id: "2",
    title: "Data Science & Machine Learning Masterclass",
    slug: "data-science-machine-learning",
    description:
      "Comprehensive course on data science, machine learning, and AI fundamentals.",
    short_description:
      "From data analysis to building ML models - everything you need to become a data scientist.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    price: 129.99,
    status: "published",
    level: "intermediate",
    duration_hours: 62,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    average_rating: 4.9,
    enrollment_count: 2156,
    category: {
      id: "2",
      name: "Data Science",
      slug: "data-science",
      description: null,
      icon: "BarChart",
      created_at: ""
    },
    instructor: {
      id: "2",
      user_id: "2",
      full_name: "Michael Chen",
      avatar_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      bio: null,
      website: null,
      created_at: "",
      updated_at: ""
    }
  },
  {
    id: "3",
    instructor_id: "3",
    category_id: "3",
    title: "UI/UX Design Fundamentals",
    slug: "ui-ux-design-fundamentals",
    description:
      "Learn the principles of user interface and user experience design.",
    short_description:
      "Create beautiful, user-friendly designs with industry-standard tools and techniques.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
    price: 0,
    status: "published",
    level: "beginner",
    duration_hours: 28,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    average_rating: 4.7,
    enrollment_count: 5832,
    category: {
      id: "3",
      name: "Design",
      slug: "design",
      description: null,
      icon: "Palette",
      created_at: ""
    },
    instructor: {
      id: "3",
      user_id: "3",
      full_name: "Emma Williams",
      avatar_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      bio: null,
      website: null,
      created_at: "",
      updated_at: ""
    }
  },
  {
    id: "4",
    instructor_id: "4",
    category_id: "4",
    title: "Digital Marketing Strategy",
    slug: "digital-marketing-strategy",
    description: "Master digital marketing strategies for business growth.",
    short_description:
      "Learn SEO, social media marketing, content strategy, and paid advertising.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    price: 69.99,
    status: "published",
    level: "beginner",
    duration_hours: 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    average_rating: 4.6,
    enrollment_count: 1847,
    category: {
      id: "4",
      name: "Marketing",
      slug: "marketing",
      description: null,
      icon: "TrendingUp",
      created_at: ""
    },
    instructor: {
      id: "4",
      user_id: "4",
      full_name: "David Park",
      avatar_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      bio: null,
      website: null,
      created_at: "",
      updated_at: ""
    }
  }
]

export function FeaturedCoursesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Featured Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Handpicked courses to kickstart your learning journey. Updated
              regularly with fresh content.
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline" className="group">
              View All Courses
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}
