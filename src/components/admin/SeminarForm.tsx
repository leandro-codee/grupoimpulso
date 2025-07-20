"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Seminar } from "@/types"
import RichTextEditor from "./RichTextEditor"

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
  const [formData, setFormData] = useState<Partial<Seminar & { eventDate: string }>>({
    title: seminar?.title || "",
    description: seminar?.description || "",
    shortDescription: seminar?.shortDescription || "",
    eventDate: seminar?.eventDate
      ? (new Date(seminar.eventDate).toISOString().slice(0, 16) as unknown as any)
      : ("" as unknown as any),
    duration: seminar?.duration || "",
    modality: seminar?.modality || "in_person",
    price: seminar?.price || 0,
    totalSlots: seminar?.totalSlots || 1,
    availableSlots: seminar?.availableSlots || 0,
    instructor: seminar?.instructor || "",
    location: seminar?.location || "",
    virtualLink: seminar?.virtualLink || "",
    status: seminar?.status || "draft",
    featured: seminar?.featured || false,
    featuredImage: seminar?.featuredImage || "",
  })
  const [slotsError, setSlotsError] = useState("");

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
    setFormData((prev) => {
      const newValue =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? value === "" ? 0 : Number(value)
          : value;
      const updated = { ...prev, [name]: newValue };
      // Validación de cupos
      if (
        (name === "availableSlots" && Number(newValue) > Number(prev.totalSlots)) ||
        (name === "totalSlots" && Number(prev.availableSlots) > Number(newValue))
      ) {
        setSlotsError("Los cupos disponibles no pueden ser mayores que los totales.");
      } else {
        setSlotsError("");
      }
      return updated;
    });
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

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'video/mp4') {
      alert('Solo se permite subir videos en formato MP4')
      return
    }
    const uploadFormData = new FormData()
    uploadFormData.append('file', file)
    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      })
      const result = await response.json()
      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          videoUrl: result.data.url,
        }))
      } else {
        alert('Error al subir video')
      }
    } catch (error) {
      console.error('Error uploading video:', error)
      alert('Error al subir video')
    }
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
              placeholder="Título del seminario"
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
              Fecha del Evento *
            </label>
            <input
              type="datetime-local"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Ej: 4 horas, 2 días"
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
              Cupos Disponibles
            </label>
            <input
              type="number"
              name="availableSlots"
              value={formData.availableSlots === 0 ? "" : formData.availableSlots}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            {slotsError && (
              <p className="text-red-600 text-sm mt-1">{slotsError}</p>
            )}
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
            placeholder="Breve descripción del seminario (máximo 200 caracteres)"
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
            placeholder="Describe el seminario en detalle. Puedes usar formato de texto, insertar imágenes y videos."
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

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video del Seminario (opcional, mp4)
          </label>
          <div className="space-y-2">
            <label className="cursor-pointer inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
              Subir Video
              <input
                type="file"
                accept="video/mp4"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>
            {formData.videoUrl && (
              <div className="mt-2">
                <video
                  src={formData.videoUrl}
                  controls
                  className="h-32 w-56 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, videoUrl: "" }))}
                  className="mt-1 text-sm text-red-600 hover:text-red-800"
                >
                  Eliminar video
                </button>
              </div>
            )}
          </div>
        </div>

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
            disabled={loading || !!slotsError}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? "Guardando..." : isEditing ? "Actualizar Seminario" : "Crear Seminario"}
          </button>
        </div>
      </form>
    </div>
  )
}
