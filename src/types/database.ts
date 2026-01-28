export type AppRole = 'student' | 'instructor' | 'admin';
export type CourseStatus = 'draft' | 'published' | 'archived';
export type LessonContentType = 'video' | 'text' | 'pdf' | 'quiz';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface Course {
  id: string;
  instructor_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  thumbnail_url: string | null;
  price: number;
  status: CourseStatus;
  level: string;
  duration_hours: number;
  created_at: string;
  updated_at: string;
  // Relations
  instructor?: Profile;
  category?: Category;
  lessons?: Lesson[];
  reviews?: Review[];
  enrollment_count?: number;
  average_rating?: number;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  content_type: LessonContentType;
  content_url: string | null;
  content_text: string | null;
  duration_minutes: number;
  order_index: number;
  is_free: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at: string | null;
  course?: Course;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  progress_percentage: number;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  course_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  user?: Profile;
}

export interface Wishlist {
  id: string;
  user_id: string;
  course_id: string;
  created_at: string;
  course?: Course;
}
