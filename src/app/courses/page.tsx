"use client"
import { useState, useEffect } from "react"
import { Course } from "@/types"
import { formatDate, formatPrice } from "@/lib/utils"
import Link from "next/link"
import { Calendar, Clock, MapPin, Monitor, Users, Star, GraduationCap } from "lucide-react"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses")
      const result = await response.json()
      if (result.success) {
        setCourses(result.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching courses:", error)
      setLoading(false)
    }
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

  const modalityLabels = {
    in_person: "Presencial",
    virtual: "Virtual",
    hybrid: "Híbrido",
  }

  const filteredCourses = courses.filter((course) => {
    const levelMatch = selectedLevel === "all" || course.level === selectedLevel
    const categoryMatch = selectedCategory === "all" || course.category === selectedCategory
    return levelMatch && categoryMatch && course.status === "published"
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cursos de Formación
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Desarrolla tus habilidades con nuestros cursos especializados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="text-2xl font-bold">{courses.length}</div>
                <div className="text-sm">Cursos Disponibles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Filtrar Cursos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todos los niveles</option>
                {Object.entries(levelLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todas las categorías</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {course.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.featuredImage}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Destacado
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {levelLabels[course.level]}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-600 font-medium">
                    {categoryLabels[course.category]}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(course.price)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.shortDescription}
                </p>

                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Inicio: {formatDate(course.startDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    {course.modality === "in_person" ? (
                      <MapPin className="w-4 h-4 mr-2" />
                    ) : (
                      <Monitor className="w-4 h-4 mr-2" />
                    )}
                    <span>{modalityLabels[course.modality]}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{course.availableSlots} cupos disponibles</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Por {course.instructor}
                  </span>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <GraduationCap className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">
              No hay cursos disponibles con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 