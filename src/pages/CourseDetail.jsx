import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  FileText,
  Video,
  Award,
  Globe,
  Heart
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"

// Sample course data
const sampleCourse = {
  id: "1",
  instructor_id: "1",
  category_id: "1",
  title: "Complete Web Development Bootcamp 2024",
  slug: "complete-web-development-bootcamp",
  description: `This comprehensive web development bootcamp will take you from zero to a professional full-stack developer.

You'll learn:
• HTML5, CSS3, and modern JavaScript
• React.js and state management
• Node.js and Express.js backend
• Database design with MongoDB and PostgreSQL
• RESTful APIs and authentication
• Deployment and DevOps basics

With over 45 hours of content, hands-on projects, and real-world applications, you'll be job-ready by the end of this course.`,
  short_description:
    "Master full-stack web development with hands-on projects and real-world applications.",
  thumbnail_url:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop",
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
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio:
      "Senior Software Engineer with 10+ years of experience. Former tech lead at Google and Amazon. Passionate about teaching and helping others break into tech.",
    website: "https://sarahjohnson.dev",
    created_at: "",
    updated_at: ""
  }
}

const sampleLessons = [
  {
    id: "1",
    course_id: "1",
    title: "Welcome to the Course",
    description: "Introduction and course overview",
    content_type: "video",
    content_url: null,
    content_text: null,
    duration_minutes: 10,
    order_index: 0,
    is_free: true,
    created_at: "",
    updated_at: ""
  },
  {
    id: "2",
    course_id: "1",
    title: "Setting Up Your Development Environment",
    description: "Install and configure VS Code, Node.js, and Git",
    content_type: "video",
    content_url: null,
    content_text: null,
    duration_minutes: 25,
    order_index: 1,
    is_free: true,
    created_at: "",
    updated_at: ""
  },
  {
    id: "3",
    course_id: "1",
    title: "HTML Fundamentals",
    description: "Learn the building blocks of web pages",
    content_type: "video",
    content_url: null,
    content_text: null,
    duration_minutes: 45,
    order_index: 2,
    is_free: false,
    created_at: "",
    updated_at: ""
  },
  {
    id: "4",
    course_id: "1",
    title: "CSS Styling Basics",
    description: "Make your pages beautiful",
    content_type: "video",
    content_url: null,
    content_text: null,
    duration_minutes: 55,
    order_index: 3,
    is_free: false,
    created_at: "",
    updated_at: ""
  },
  {
    id: "5",
    course_id: "1",
    title: "JavaScript Essentials",
    description: "Add interactivity to your pages",
    content_type: "video",
    content_url: null,
    content_text: null,
    duration_minutes: 90,
    order_index: 4,
    is_free: false,
    created_at: "",
    updated_at: ""
  },
  {
    id: "6",
    course_id: "1",
    title: "Project: Build a Landing Page",
    description: "Apply what you've learned",
    content_type: "text",
    content_url: null,
    content_text: null,
    duration_minutes: 120,
    order_index: 5,
    is_free: false,
    created_at: "",
    updated_at: ""
  }
]

const sampleReviews = [
  {
    id: "1",
    user_id: "2",
    course_id: "1",
    rating: 5,
    comment:
      "Absolutely fantastic course! Sarah explains everything so clearly. I went from knowing nothing to landing my first developer job in 6 months.",
    created_at: "2024-01-15",
    updated_at: "",
    user: {
      id: "2",
      user_id: "2",
      full_name: "Alex Rodriguez",
      avatar_url: null,
      bio: null,
      website: null,
      created_at: "",
      updated_at: ""
    }
  },
  {
    id: "2",
    user_id: "3",
    course_id: "1",
    rating: 5,
    comment:
      "The best web development course on the platform. The projects are challenging but so rewarding!",
    created_at: "2024-01-10",
    updated_at: "",
    user: {
      id: "3",
      user_id: "3",
      full_name: "Emily Chen",
      avatar_url: null,
      bio: null,
      website: null,
      created_at: "",
      updated_at: ""
    }
  },
  {
    id: "3",
    user_id: "4",
    course_id: "1",
    rating: 4,
    comment:
      "Great content and well-structured. Would love more advanced topics in future updates.",
    created_at: "2024-01-05",
    updated_at: "",
    user: {
      id: "4",
      user_id: "4",
      full_name: "Marcus Brown",
      avatar_url: null,
      bio: null,
      website: null,
      created_at: "",
      updated_at: ""
    }
  }
]

export default function CourseDetail() {
  const { slug } = useParams()
  const { user } = useAuth()
  const { toast } = useToast()
  const [course] = useState(sampleCourse)
  const [lessons] = useState(sampleLessons)
  const [reviews] = useState(sampleReviews)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const totalDuration = lessons.reduce(
    (acc, lesson) => acc + lesson.duration_minutes,
    0
  )
  const freeLesson = lessons.find(l => l.is_free)

  const handleEnroll = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to enroll in this course",
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Enrolled successfully!",
      description: "You can now access all course content"
    })
  }

  const handleWishlist = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add to wishlist",
        variant: "destructive"
      })
      return
    }
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted
        ? "Course removed from your wishlist"
        : "You'll be notified of updates and discounts"
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Link to="/courses" className="hover:text-primary-foreground">
                    Courses
                  </Link>
                  <span>/</span>
                  <Link
                    to={`/courses?category=${course.category?.slug}`}
                    className="hover:text-primary-foreground"
                  >
                    {course.category?.name}
                  </Link>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  {course.title}
                </h1>

                <p className="text-lg text-primary-foreground/80">
                  {course.short_description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-warning text-warning" />
                    <span className="font-semibold">
                      {course.average_rating}
                    </span>
                    <span className="text-primary-foreground/70">
                      ({reviews.length} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-5 h-5" />
                    <span>
                      {course.enrollment_count?.toLocaleString()} students
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration_hours} hours</span>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {course.level}
                  </Badge>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-foreground/20">
                    {course.instructor?.avatar_url ? (
                      <img
                        src={course.instructor.avatar_url}
                        alt={course.instructor.full_name || ""}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg font-semibold">
                        {course.instructor?.full_name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">
                      Created by
                    </p>
                    <p className="font-medium">
                      {course.instructor?.full_name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Card - Desktop */}
              <div className="hidden lg:block">
                <Card className="sticky top-24 overflow-hidden shadow-xl">
                  <div className="aspect-video">
                    <img
                      src={course.thumbnail_url || ""}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-3xl font-bold">
                        {course.price === 0 ? "Free" : `$${course.price}`}
                      </span>
                      {course.price > 0 && (
                        <span className="text-muted-foreground line-through">
                          $199.99
                        </span>
                      )}
                    </div>

                    <Button
                      variant="cta"
                      size="lg"
                      className="w-full"
                      onClick={handleEnroll}
                    >
                      {course.price === 0 ? "Enroll for Free" : "Enroll Now"}
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={handleWishlist}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isWishlisted
                            ? "fill-destructive text-destructive"
                            : ""
                        }`}
                      />
                      {isWishlisted
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </Button>

                    <div className="pt-4 space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {course.duration_hours} hours on-demand video
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span>{lessons.length} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Enrollment Card */}
        <div className="lg:hidden sticky top-16 z-40 bg-card border-b p-4">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div>
              <span className="font-display text-2xl font-bold">
                {course.price === 0 ? "Free" : `$${course.price}`}
              </span>
            </div>
            <Button variant="cta" onClick={handleEnroll}>
              {course.price === 0 ? "Enroll Free" : "Enroll Now"}
            </Button>
          </div>
        </div>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="lg:grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="space-y-8">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-8">
                    <div>
                      <h2 className="font-display text-2xl font-bold mb-4">
                        About this course
                      </h2>
                      <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                        {course.description}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-bold mb-4">
                        What you'll learn
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          "Build responsive websites",
                          "Master JavaScript",
                          "Create React apps",
                          "Build APIs with Node.js",
                          "Database design",
                          "Deploy applications"
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="curriculum" className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-2xl font-bold">
                        Course Content
                      </h2>
                      <span className="text-sm text-muted-foreground">
                        {lessons.length} lessons •{" "}
                        {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                      </span>
                    </div>

                    <div className="space-y-2">
                      {lessons.map((lesson, index) => (
                        <Card key={lesson.id} className="overflow-hidden">
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                              {lesson.is_free ? (
                                <Play className="w-4 h-4" />
                              ) : (
                                <Lock className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {index + 1}.
                                </span>
                                <span className="font-medium truncate">
                                  {lesson.title}
                                </span>
                                {lesson.is_free && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Free
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {lesson.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                              {lesson.content_type === "video" ? (
                                <Video className="w-4 h-4" />
                              ) : (
                                <FileText className="w-4 h-4" />
                              )}
                              <span>{lesson.duration_minutes}m</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="instructor" className="space-y-6">
                    <h2 className="font-display text-2xl font-bold">
                      About the Instructor
                    </h2>

                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        {course.instructor?.avatar_url ? (
                          <img
                            src={course.instructor.avatar_url}
                            alt={course.instructor.full_name || ""}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted flex items-center justify-center text-2xl font-bold">
                            {course.instructor?.full_name?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold">
                          {course.instructor?.full_name}
                        </h3>
                        <p className="text-muted-foreground">
                          Senior Software Engineer
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span>
                            <strong>4.9</strong> Instructor Rating
                          </span>
                          <span>
                            <strong>12</strong> Courses
                          </span>
                          <span>
                            <strong>50K+</strong> Students
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {course.instructor?.bio}
                    </p>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-2xl font-bold">
                        Student Reviews
                      </h2>
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 fill-warning text-warning" />
                        <span className="font-display text-2xl font-bold">
                          {course.average_rating}
                        </span>
                        <span className="text-muted-foreground">
                          ({reviews.length} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {reviews.map(review => (
                        <Card key={review.id}>
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                  {review.user?.full_name?.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {review.user?.full_name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(
                                      review.created_at
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-warning text-warning"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {review.comment}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
