import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  Eye
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

// Sample instructor courses
const sampleCourses = [
  {
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
    created_at: "2024-01-01",
    updated_at: "2024-01-15",
    enrollment_count: 3420,
    average_rating: 4.8
  },
  {
    id: "2",
    instructor_id: "1",
    category_id: "1",
    title: "React.js Advanced Patterns",
    slug: "react-advanced-patterns",
    description: "",
    short_description: "Deep dive into advanced React patterns",
    thumbnail_url:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
    price: 99.99,
    status: "draft",
    level: "advanced",
    duration_hours: 35,
    created_at: "2024-01-10",
    updated_at: "2024-01-20",
    enrollment_count: 0,
    average_rating: 0
  }
]

export default function InstructorDashboard() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [courses] = useState(sampleCourses)

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

  const publishedCourses = courses.filter(c => c.status === "published")
  const draftCourses = courses.filter(c => c.status === "draft")
  const totalStudents = courses.reduce(
    (acc, c) => acc + (c.enrollment_count || 0),
    0
  )
  const totalRevenue = courses.reduce(
    (acc, c) => acc + c.price * (c.enrollment_count || 0),
    0
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">
                Instructor Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your courses and track your performance
              </p>
            </div>
            <Button variant="cta">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
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
                    <p className="text-2xl font-bold">{courses.length}</p>
                    <p className="text-sm text-muted-foreground">
                      Total Courses
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {totalStudents.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Students
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-cta" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      ${totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Revenue
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses Tabs */}
          <Tabs defaultValue="published" className="space-y-6">
            <TabsList>
              <TabsTrigger value="published">
                Published ({publishedCourses.length})
              </TabsTrigger>
              <TabsTrigger value="drafts">
                Drafts ({draftCourses.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="published" className="space-y-4">
              {publishedCourses.length > 0 ? (
                publishedCourses.map(course => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 shrink-0">
                          <img
                            src={course.thumbnail_url || ""}
                            alt={course.title}
                            className="w-full h-32 sm:h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4 sm:p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-semibold text-lg">
                                  {course.title}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="bg-success/10 text-success"
                                >
                                  Published
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {course.short_description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-6 mt-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                Students:{" "}
                              </span>
                              <span className="font-medium">
                                {course.enrollment_count?.toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Rating:{" "}
                              </span>
                              <span className="font-medium">
                                {course.average_rating || "N/A"}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Price:{" "}
                              </span>
                              <span className="font-medium">
                                ${course.price}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Revenue:{" "}
                              </span>
                              <span className="font-medium text-success">
                                $
                                {(
                                  course.price * (course.enrollment_count || 0)
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
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
                    No published courses
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Publish your first course to start earning!
                  </p>
                  <Button variant="cta">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Course
                  </Button>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="drafts" className="space-y-4">
              {draftCourses.length > 0 ? (
                draftCourses.map(course => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 shrink-0">
                          <img
                            src={course.thumbnail_url || ""}
                            alt={course.title}
                            className="w-full h-32 sm:h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4 sm:p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-semibold text-lg">
                                  {course.title}
                                </h3>
                                <Badge variant="secondary">Draft</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {course.short_description}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            Last updated:{" "}
                            {new Date(course.updated_at).toLocaleDateString()}
                          </p>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="cta">
                              <Edit className="w-4 h-4 mr-1" />
                              Continue Editing
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
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
                    No drafts
                  </h3>
                  <p className="text-muted-foreground">
                    All your courses are published!
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
