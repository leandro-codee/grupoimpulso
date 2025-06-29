"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Course } from "@/types"
import { formatDate, formatPrice } from "@/lib/utils"
import { Calendar, Clock, MapPin, Users, BookOpen, Award, CheckCircle } from "lucide-react"

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

export default function CourseDetailPage() {
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([])

  useEffect(() => {
    if (params.slug) {
      fetchCourse()
    }
  }, [params.slug])

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${params.slug}`)
      const result = await response.json()
      if (result.success) {
        setCourse(result.data)

        // Get related courses from the same category
        const relatedResponse = await fetch(
          `/api/courses?category=${result.data.category}&limit=3`
        )
        const relatedResult = await relatedResponse.json()
        if (relatedResult.success) {
          setRelatedCourses(
            relatedResult.data.filter(
              (c: Course) => c._id !== result.data._id
            )
          )
        }
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching course:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Curso no encontrado
          </h1>
          <Link
            href="/courses"
            className="text-purple-600 hover:text-purple-800"
          >
            Volver a cursos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-purple-600">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-purple-600">
            Cursos
          </Link>
          <span>/</span>
          <span className="text-gray-900">{course.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {course.featuredImage && (
                <div className="relative h-64 md:h-80 w-full">
                  <Image
                    src={course.featuredImage}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full mr-2">
                    {categoryLabels[course.category]}
                  </span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {levelLabels[course.level]}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>

                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  {course.shortDescription}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Inicio</div>
                    <div className="font-semibold">{formatDate(course.startDate)}</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Duración</div>
                    <div className="font-semibold">{course.duration}</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Cupos</div>
                    <div className="font-semibold">{course.availableSlots} disponibles</div>
                  </div>
                  <div className="text-center">
                    <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Modalidad</div>
                    <div className="font-semibold">{modalityLabels[course.modality]}</div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Descripción del Curso</h2>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                </div>

                {course.requirements && course.requirements.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Requisitos</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {course.syllabus && course.syllabus.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Programa del Curso</h3>
                    <div className="space-y-3">
                      {course.syllabus.map((item, index) => (
                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <BookOpen className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-purple-600 font-semibold text-lg">
                        {course.instructor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Instructor</div>
                      <div className="font-semibold text-gray-900">{course.instructor}</div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {formatPrice(course.price)}
                </div>
                <div className="text-sm text-gray-600">Precio del curso</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fecha de inicio:</span>
                  <span className="font-semibold">{formatDate(course.startDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fecha de fin:</span>
                  <span className="font-semibold">{formatDate(course.endDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Modalidad:</span>
                  <span className="font-semibold">{modalityLabels[course.modality]}</span>
                </div>
                {course.location && (
                  <div className="flex items-start justify-between">
                    <span className="text-gray-600">Ubicación:</span>
                    <span className="font-semibold text-right flex-1 ml-2">{course.location}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cupos disponibles:</span>
                  <span className="font-semibold">{course.availableSlots}</span>
                </div>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  course.availableSlots > 0
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={course.availableSlots === 0}
              >
                {course.availableSlots > 0 ? "Inscribirse" : "Agotado"}
              </button>

              <div className="mt-4 text-center">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Santiago, Chile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Cursos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <Link
                  key={relatedCourse._id}
                  href={`/courses/${relatedCourse.slug}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {relatedCourse.featuredImage && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedCourse.featuredImage}
                        alt={relatedCourse.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {relatedCourse.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedCourse.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-600 font-bold">
                        {formatPrice(relatedCourse.price)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(relatedCourse.startDate)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 