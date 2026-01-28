import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CourseCard } from "@/components/courses/CourseCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

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
  },
  {
    id: "5",
    instructor_id: "5",
    category_id: "1",
    title: "React.js Advanced Patterns",
    slug: "react-advanced-patterns",
    description: "Deep dive into advanced React patterns and best practices.",
    short_description:
      "Master hooks, context, performance optimization, and testing in React.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    price: 99.99,
    status: "published",
    level: "advanced",
    duration_hours: 35,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    average_rating: 4.9,
    enrollment_count: 1234,
    category: {
      id: "1",
      name: "Web Development",
      slug: "web-development",
      description: null,
      icon: "Code",
      created_at: ""
    },
    instructor: {
      id: "5",
      user_id: "5",
      full_name: "Alex Rivera",
      avatar_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      bio: null,
      website: null,
      created_at: "",
      updated_at: ""
    }
  },
  {
    id: "6",
    instructor_id: "6",
    category_id: "5",
    title: "Photography Masterclass",
    slug: "photography-masterclass",
    description:
      "Learn professional photography techniques from basics to advanced.",
    short_description:
      "Capture stunning photos with any camera. Learn composition, lighting, and editing.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=450&fit=crop",
    price: 79.99,
    status: "published",
    level: "beginner",
    duration_hours: 24,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    average_rating: 4.8,
    enrollment_count: 2891,
    category: {
      id: "5",
      name: "Photography",
      slug: "photography",
      description: null,
      icon: "Camera",
      created_at: ""
    },
    instructor: {
      id: "6",
      user_id: "6",
      full_name: "Lisa Thompson",
      avatar_url:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      bio: null,
      website: null,
      created_at: "",
      updated_at: ""
    }
  }
]

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  )
  const [selectedLevel, setSelectedLevel] = useState(
    searchParams.get("level") || "all"
  )
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "popular")
  const [categories, setCategories] = useState([])
  const [courses] = useState(sampleCourses)

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name")
      if (data) setCategories(data)
    }
    fetchCategories()
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.short_description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || course.category?.slug === selectedCategory
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return (b.enrollment_count || 0) - (a.enrollment_count || 0)
      case "rating":
        return (b.average_rating || 0) - (a.average_rating || 0)
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedLevel("all")
    setSortBy("popular")
    setSearchParams({})
  }

  const hasActiveFilters =
    searchQuery || selectedCategory !== "all" || selectedLevel !== "all"

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Explore Courses
            </h1>
            <p className="text-muted-foreground">
              Discover {courses.length}+ courses to advance your career
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1 capitalize">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedLevel !== "all" && (
                <Badge variant="secondary" className="gap-1 capitalize">
                  {selectedLevel}
                  <button onClick={() => setSelectedLevel("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {sortedCourses.length} courses
          </p>

          {/* Courses Grid */}
          {sortedCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                No courses found matching your criteria
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
