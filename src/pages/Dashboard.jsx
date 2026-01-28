import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Trophy, Clock, GraduationCap, Play } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

// Sample enrolled courses
const sampleEnrollments = [
  {
    id: "1",
    user_id: "1",
    course_id: "1",
    enrolled_at: "2024-01-10",
    completed_at: null,
    progress: 65,
    course: {
      id: "1",
      instructor_id: "1",
      category_id: "1",
      title: "Complete Web Development Bootcamp 2024",
      slug: "complete-web-development-bootcamp",
      description: "",
      short_description: "Master full-stack web development",
      thumbnail_url:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
      price: 89.99,
      status: "published",
      level: "beginner",
      duration_hours: 45,
      created_at: "",
      updated_at: "",
      lessons: []
    }
  },
  {
    id: "2",
    user_id: "1",
    course_id: "2",
    enrolled_at: "2024-01-05",
    completed_at: null,
    progress: 30,
    course: {
      id: "2",
      instructor_id: "2",
      category_id: "2",
      title: "Data Science & Machine Learning",
      slug: "data-science-machine-learning",
      description: "",
      short_description: "From data analysis to ML models",
      thumbnail_url:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
      price: 129.99,
      status: "published",
      level: "intermediate",
      duration_hours: 62,
      created_at: "",
      updated_at: ""
    }
  },
  {
    id: "3",
    user_id: "1",
    course_id: "3",
    enrolled_at: "2023-12-20",
    completed_at: "2024-01-08",
    progress: 100,
    course: {
      id: "3",
      instructor_id: "3",
      category_id: "3",
      title: "UI/UX Design Fundamentals",
      slug: "ui-ux-design-fundamentals",
      description: "",
      short_description: "Create beautiful designs",
      thumbnail_url:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
      price: 0,
      status: "published",
      level: "beginner",
      duration_hours: 28,
      created_at: "",
      updated_at: ""
    }
  }
]

export default function Dashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [enrollments] = useState(sampleEnrollments)

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth")
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!user) return null

  const inProgress = enrollments.filter(e => !e.completed_at)
  const completed = enrollments.filter(e => e.completed_at)
  const totalHoursLearned = enrollments.reduce(
    (acc, e) => acc + (e.progress / 100) * e.course.duration_hours,
    0
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">
              Welcome back,{" "}
              {user.user_metadata?.full_name || user.email?.split("@")[0]}!
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{enrollments.length}</p>
                    <p className="text-sm text-muted-foreground">Courses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completed.length}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.round(totalHoursLearned)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Hours Learned
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-cta" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completed.length}</p>
                    <p className="text-sm text-muted-foreground">
                      Certificates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="in-progress" className="space-y-6">
            <TabsList>
              <TabsTrigger value="in-progress">
                In Progress ({inProgress.length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed ({completed.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="in-progress" className="space-y-4">
              {inProgress.length > 0 ? (
                inProgress.map(enrollment => (
                  <Card
                    key={enrollment.id}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 shrink-0">
                          <img
                            src={enrollment.course.thumbnail_url || ""}
                            alt={enrollment.course.title}
                            className="w-full h-32 sm:h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="font-display font-semibold text-lg mb-2">
                              {enrollment.course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {enrollment.course.short_description}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                Progress
                              </span>
                              <span className="font-medium">
                                {enrollment.progress}%
                              </span>
                            </div>
                            <Progress
                              value={enrollment.progress}
                              className="h-2"
                            />
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {Math.round(
                                  (enrollment.progress / 100) *
                                    enrollment.course.duration_hours
                                )}
                                h of {enrollment.course.duration_hours}h
                              </span>
                              <Link to={`/courses/${enrollment.course.slug}`}>
                                <Button size="sm" variant="accent">
                                  <Play className="w-4 h-4 mr-1" />
                                  Continue
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">
                    No courses in progress
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start learning something new today!
                  </p>
                  <Link to="/courses">
                    <Button variant="cta">Browse Courses</Button>
                  </Link>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completed.length > 0 ? (
                completed.map(enrollment => (
                  <Card key={enrollment.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 shrink-0 relative">
                          <img
                            src={enrollment.course.thumbnail_url || ""}
                            alt={enrollment.course.title}
                            className="w-full h-32 sm:h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-success/20 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center">
                              <Trophy className="w-8 h-8 text-success-foreground" />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 p-4 sm:p-6">
                          <h3 className="font-display font-semibold text-lg mb-2">
                            {enrollment.course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Completed on{" "}
                            {enrollment.completed_at
                              ? new Date(
                                  enrollment.completed_at
                                ).toLocaleDateString()
                              : ""}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <GraduationCap className="w-4 h-4 mr-1" />
                              View Certificate
                            </Button>
                            <Link to={`/courses/${enrollment.course.slug}`}>
                              <Button size="sm" variant="ghost">
                                Review Course
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <Trophy className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">
                    No completed courses yet
                  </h3>
                  <p className="text-muted-foreground">
                    Keep learning to earn your first certificate!
                  </p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
