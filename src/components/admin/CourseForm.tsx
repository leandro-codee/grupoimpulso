"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Course } from "@/types"
import RichTextEditor from "./RichTextEditor"

interface CourseFormProps {
  course?: Course
  isEditing?: boolean
}

export default function CourseForm({
  course,
  isEditing = false,
}: CourseFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Course & { startDate: string; endDate: string }>>({
    title: course?.title || "",
    description: course?.description || "",
    shortDescription: course?.shortDescription || "",
    startDate: course?.startDate
      ? (new Date(course.startDate).toISOString().slice(0, 16) as unknown as any)
      : ("" as unknown as any),
    endDate: course?.endDate
      ? (new Date(course.endDate).toISOString().slice(0, 16) as unknown as any)
      : ("" as unknown as any),
    duration: course?.duration || "",
    modality: course?.modality || "in_person",
    price: course?.price || 0,
    totalSlots: course?.totalSlots || 1,
    instructor: course?.instructor || "",
    location: course?.location || "",
    virtualLink: course?.virtualLink || "",
    status: course?.status || "draft",
    featured: course?.featured || false,
    featuredImage: course?.featuredImage || "",
    level: course?.level || "beginner",
    category: course?.category || "technical",
    requirements: course?.requirements || [],
    syllabus: course?.syllabus || [],
  })

  const [requirementInput, setRequirementInput] = useState("")
  const [syllabusInput, setSyllabusInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEditing
        ? `/api/admin/courses/${course?._id}`
        : "/api/admin/courses"

      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        router.push("/admin/courses")
        router.refresh()
      } else {
        alert(result.error || "Error al guardar el curso")
      }
    } catch (error) {
      console.error("Error saving course:", error)
      alert("Error al guardar el curso")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }))
  }

  const handleDescriptionChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const uploadFormData = new FormData()
    uploadFormData.append("file", file)

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      })

      const result = await response.json()
      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          featuredImage: result.data.url,
        }))
      } else {
        alert("Error al subir imagen")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error al subir imagen")
    }
  }

  const addRequirement = () => {
    if (requirementInput.trim() && !formData.requirements?.includes(requirementInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...(prev.requirements || []), requirementInput.trim()],
      }))
      setRequirementInput("")
    }
  }

  const removeRequirement = (requirementToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements?.filter((req) => req !== requirementToRemove) || [],
    }))
  }

  const addSyllabus = () => {
    if (syllabusInput.trim() && !formData.syllabus?.includes(syllabusInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        syllabus: [...(prev.syllabus || []), syllabusInput.trim()],
      }))
      setSyllabusInput("")
    }
  }

  const removeSyllabus = (syllabusToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus?.filter((item) => item !== syllabusToRemove) || [],
    }))
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

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Título del curso"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructor *
            </label>
            <input
              type="text"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del instructor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración *
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Ej: 40 horas, 8 semanas"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Inicio *
            </label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Fin *
            </label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modalidad *
            </label>
            <select
              name="modality"
              value={formData.modality}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="in_person">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="hybrid">Híbrido</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel *
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(levelLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cupos Totales *
            </label>
            <input
              type="number"
              name="totalSlots"
              value={formData.totalSlots}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
              <option value="sold_out">Agotado</option>
              <option value="finished">Finalizado</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagen Principal
            </label>
            <div className="space-y-2">
              <label className="cursor-pointer inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Subir Imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              
              {formData.featuredImage && (
                <div className="mt-2">
                  <img
                    src={formData.featuredImage}
                    alt="Vista previa"
                    className="h-32 w-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, featuredImage: "" }))}
                    className="mt-1 text-sm text-red-600 hover:text-red-800"
                  >
                    Eliminar imagen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción Corta *
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            rows={3}
            maxLength={200}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Breve descripción del curso (máximo 200 caracteres)"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.shortDescription?.length || 0}/200 caracteres
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción Completa *
          </label>
          <RichTextEditor
            content={formData.description || ""}
            onChange={handleDescriptionChange}
            placeholder="Describe el curso en detalle. Puedes usar formato de texto, insertar imágenes y videos."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Requisitos
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={requirementInput}
              onChange={(e) => setRequirementInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addRequirement())
              }
              placeholder="Agregar requisito"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addRequirement}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Agregar
            </button>
          </div>
          <div className="space-y-2">
            {formData.requirements?.map((requirement, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm">{requirement}</span>
                <button
                  type="button"
                  onClick={() => removeRequirement(requirement)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Programa del Curso
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={syllabusInput}
              onChange={(e) => setSyllabusInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSyllabus())
              }
              placeholder="Agregar tema del programa"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addSyllabus}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Agregar
            </button>
          </div>
          <div className="space-y-2">
            {formData.syllabus?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span className="text-sm">{item}</span>
                <button
                  type="button"
                  onClick={() => removeSyllabus(item)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {(formData.modality === "in_person" ||
          formData.modality === "hybrid") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dirección del lugar donde se realizará"
            />
          </div>
        )}

        {(formData.modality === "virtual" || formData.modality === "hybrid") && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link Virtual
            </label>
            <input
              type="url"
              name="virtualLink"
              value={formData.virtualLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://zoom.us/j/..."
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mr-2 w-4 h-4 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">
              Destacar en página principal
            </span>
          </label>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"} Curso
          </button>
        </div>
      </form>
    </div>
  )
} 