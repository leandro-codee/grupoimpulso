"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Seminar } from "@/types"

interface SeminarFormProps {
  seminar?: Seminar
  isEditing?: boolean
}

export default function SeminarForm({
  seminar,
  isEditing = false,
}: SeminarFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Seminar>>({
    title: seminar?.title || "",
    description: seminar?.description || "",
    shortDescription: seminar?.shortDescription || "",
    eventDate: seminar?.eventDate
      ? (new Date(seminar.eventDate).toISOString().slice(0, 16) as any)
      : ("" as any),
    duration: seminar?.duration || "",
    modality: seminar?.modality || "in_person",
    price: seminar?.price || 0,
    totalSlots: seminar?.totalSlots || 1,
    instructor: seminar?.instructor || "",
    location: seminar?.location || "",
    virtualLink: seminar?.virtualLink || "",
    status: seminar?.status || "draft",
    featured: seminar?.featured || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEditing
        ? `/api/admin/seminars/${seminar?._id}`
        : "/api/admin/seminars"

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
        router.push("/admin/seminars")
        router.refresh()
      } else {
        alert(result.error || "Error al guardar el seminario")
      }
    } catch (error) {
      console.error("Error saving seminar:", error)
      alert("Error al guardar el seminario")
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Instructor
          </label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha del Evento
          </label>
          <input
            type="datetime-local"
            name="eventDate"
            value={formData.eventDate as any}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duración
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Ej: 4 horas, 2 días"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modalidad
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
            Precio
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cupos Totales
          </label>
          <input
            type="number"
            name="totalSlots"
            value={formData.totalSlots}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción Corta
        </label>
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          rows={3}
          maxLength={200}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción Completa
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          />
        </div>
      )}

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">
            Destacar en página principal
          </span>
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}{" "}
          Seminario
        </button>
      </div>
    </form>
  )
}
