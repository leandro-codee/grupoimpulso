import AdminLayout from "@/components/admin/AdminLayout"
import CourseForm from "@/components/admin/CourseForm"

export default function NewCoursePage() {
  return (
    <AdminLayout title="Nuevo Curso">
      <CourseForm />
    </AdminLayout>
  )
} 