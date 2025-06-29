"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { NewsArticle } from "@/types"
import RichTextEditor from "./RichTextEditor"

interface NewsFormProps {
  article?: NewsArticle
  isEditing?: boolean
}

export default function NewsForm({
  article,
  isEditing = false,
}: NewsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<NewsArticle & { publishDate: string }>>({
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    publishDate: article?.publishDate
      ? (new Date(article.publishDate).toISOString().slice(0, 16)) as unknown as any
      : (new Date().toISOString().slice(0, 16)) as unknown as any,
    category: article?.category || "general",
    tags: article?.tags || [],
    status: article?.status || "draft",
    featured: article?.featured || false,
    featuredImage: article?.featuredImage || "",
  })
  const [tagInput, setTagInput] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEditing
        ? `/api/admin/news/${article?._id}`
        : "/api/admin/news"

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
        router.push("/admin/news")
        router.refresh()
      } else {
        alert(result.error || "Error al guardar la noticia")
      }
    } catch (error) {
      console.error("Error saving news:", error)
      alert("Error al guardar la noticia")
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
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
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
              placeholder="Título de la noticia"
            />
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
              <option value="general">Noticias Generales</option>
              <option value="announcements">Comunicados</option>
              <option value="events">Eventos</option>
              <option value="training">Capacitación</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Publicación *
            </label>
            <input
              type="datetime-local"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
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
              <option value="hidden">Oculto</option>
            </select>
          </div>

          <div>
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
            Resumen *
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            maxLength={300}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Breve descripción de la noticia (máximo 300 caracteres)"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.excerpt?.length || 0}/300 caracteres
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contenido *
          </label>
          <RichTextEditor
            content={formData.content || ""}
            onChange={handleContentChange}
            placeholder="Escribe el contenido de la noticia aquí. Puedes usar el formato de texto, insertar imágenes y videos."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Etiquetas
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              placeholder="Agregar etiqueta"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              Agregar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
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
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"} Noticia
          </button>
        </div>
      </form>
    </div>
  )
}
