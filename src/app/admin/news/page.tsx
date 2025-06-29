"use client"
import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import Link from "next/link"
import { NewsArticle } from "@/types"
import { formatDate } from "@/lib/utils"
import { Edit, Trash2, Eye } from "lucide-react"

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/admin/news")
      const result = await response.json()
      if (result.success) {
        setNews(result.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching news:", error)
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta noticia?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()

      if (result.success) {
        setNews(news.filter((n) => n._id !== id))
      } else {
        alert(result.error || "Error al eliminar noticia")
      }
    } catch (error) {
      console.error("Error deleting news:", error)
      alert("Error al eliminar noticia")
    }
  }

  const statusLabels = {
    draft: "Borrador",
    published: "Publicado",
    hidden: "Oculto",
  }

  const categoryLabels = {
    general: "Noticias Generales",
    announcements: "Comunicados",
    events: "Eventos",
    training: "Capacitación",
  }

  if (loading) {
    return (
      <AdminLayout title="Noticias">
        <div className="flex justify-center">Cargando...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Noticias">
      <div className="mb-6">
        <Link
          href="/admin/news/new"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Nueva Noticia
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.map((article) => (
                <tr key={article._id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={article.title}>
                          {article.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {article.author}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {categoryLabels[article.category]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(article.publishDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          article.status === "published"
                            ? "bg-green-100 text-green-800"
                            : article.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusLabels[article.status]}
                      </span>
                      {article.featured && (
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          Destacado
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/news/${article.slug}`}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Ver noticia"
                        target="_blank"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/news/${article._id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article._id!)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {news.map((article) => (
          <div key={article._id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 break-words">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500">{article.author}</p>
              </div>
              <div className="ml-2 flex flex-col space-y-1 flex-shrink-0">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    article.status === "published"
                      ? "bg-green-100 text-green-800"
                      : article.status === "draft"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {statusLabels[article.status]}
                </span>
                {article.featured && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Destacado
                  </span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-500">Categoría:</span>
                <p className="font-medium">{categoryLabels[article.category]}</p>
              </div>
              <div>
                <span className="text-gray-500">Fecha:</span>
                <p className="font-medium">{formatDate(article.publishDate)}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
              <Link
                href={`/news/${article.slug}`}
                className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                target="_blank"
              >
                <Eye className="w-4 h-4 mr-1" />
                Ver
              </Link>
              <Link
                href={`/admin/news/${article._id}/edit`}
                className="flex items-center px-3 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Link>
              <button
                onClick={() => handleDelete(article._id!)}
                className="flex items-center px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay noticias registradas</p>
        </div>
      )}
    </AdminLayout>
  )
}
