"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import CourseForm from "@/components/admin/CourseForm"
import { Course } from "@/types"

export default function EditCoursePage() {
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchCourse()
    }
  }, [params.id])

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/admin/courses/${params.id}`)
      const result = await response.json()
      if (result.success) {
        setCourse(result.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching course:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Editar Curso">
        <div className="flex justify-center">Cargando...</div>
      </AdminLayout>
    )
  }

  if (!course) {
    return (
      <AdminLayout title="Editar Curso">
        <div className="text-center">Curso no encontrado</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Editar Curso">
      <CourseForm course={course} isEditing={true} />
    </AdminLayout>
  )
} 