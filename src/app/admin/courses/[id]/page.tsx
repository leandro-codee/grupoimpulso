"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import Link from "next/link"
import { Course } from "@/types"
import { formatDate, formatPrice } from "@/lib/utils"

export default function CourseDetailPage() {
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

  const statusLabels = {
    draft: "Borrador",
    published: "Publicado",
    sold_out: "Agotado",
    finished: "Finalizado",
  }

  const modalityLabels = {
    in_person: "Presencial",
    virtual: "Virtual",
    hybrid: "Híbrido",
  }

  const levelLabels = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
  }

  const categoryLabels = {
    technical: "Técnico",
    management: "Gestión",
    safety: "Seguridad",
    leadership: "Liderazgo",
  }

  if (loading) {
    return (
      <AdminLayout title="Detalle del Curso">
        <div className="flex justify-center">Cargando...</div>
      </AdminLayout>
    )
  }

  if (!course) {
    return (
      <AdminLayout title="Detalle del Curso">
        <div className="text-center">Curso no encontrado</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={`Curso: ${course.title}`}>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {course.title}
            </h2>
            <p className="text-gray-600">{course.shortDescription}</p>
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/admin/courses/${course._id}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Editar
            </Link>
            <Link
              href="/admin/courses"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Volver
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Información General
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Instructor:</dt>
                <dd className="text-sm text-gray-900">{course.instructor}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Fecha de Inicio:</dt>
                <dd className="text-sm text-gray-900">
                  {formatDate(course.startDate)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Fecha de Fin:</dt>
                <dd className="text-sm text-gray-900">
                  {formatDate(course.endDate)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Duración:</dt>
                <dd className="text-sm text-gray-900">{course.duration}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Modalidad:</dt>
                <dd className="text-sm text-gray-900">
                  {modalityLabels[course.modality]}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Nivel:</dt>
                <dd className="text-sm text-gray-900">
                  {levelLabels[course.level]}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Categoría:</dt>
                <dd className="text-sm text-gray-900">
                  {categoryLabels[course.category]}
                </dd>
              </div>
              {course.location && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Ubicación:</dt>
                  <dd className="text-sm text-gray-900">{course.location}</dd>
                </div>
              )}
              {course.virtualLink && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Link Virtual:</dt>
                  <dd className="text-sm text-gray-900">
                    <a
                      href={course.virtualLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {course.virtualLink}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalles Comerciales
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">Precio:</dt>
                <dd className="text-sm text-gray-900">
                  {formatPrice(course.price)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Cupos Totales:</dt>
                <dd className="text-sm text-gray-900">{course.totalSlots}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Cupos Disponibles:</dt>
                <dd className="text-sm text-gray-900">{course.availableSlots}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Estado:</dt>
                <dd>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      course.status === "published"
                        ? "bg-green-100 text-green-800"
                        : course.status === "draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {statusLabels[course.status]}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Destacado:</dt>
                <dd className="text-sm text-gray-900">
                  {course.featured ? "Sí" : "No"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">URL:</dt>
                <dd className="text-sm text-gray-900">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                  >
                    /courses/{course.slug}
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {course.requirements && course.requirements.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Requisitos</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-1">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="text-gray-700">{requirement}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {course.syllabus && course.syllabus.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Programa del Curso</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-decimal list-inside space-y-1">
                {course.syllabus.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Descripción Completa</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div
              className="text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 