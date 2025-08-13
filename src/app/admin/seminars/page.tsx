"use client"
import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import Link from "next/link"
import { Seminar } from "@/types"
import { formatDateRange, formatPrice } from "@/lib/utils"
import { Edit, Trash2, Eye } from "lucide-react"

export default function AdminSeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSeminars()
  }, [])

  const fetchSeminars = async () => {
    try {
      const response = await fetch("/api/admin/seminars")
      const result = await response.json()
      if (result.success) {
        setSeminars(result.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching seminars:", error)
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este seminario?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/seminars/${id}`, {
        method: "DELETE",
      })
      const result = await response.json()

      if (result.success) {
        setSeminars(seminars.filter((s) => s._id !== id))
      } else {
        alert(result.error || "Error al eliminar seminario")
      }
    } catch (error) {
      console.error("Error deleting seminar:", error)
      alert("Error al eliminar seminario")
    }
  }

  const statusLabels = {
    draft: "Borrador",
    published: "Publicado",
    sold_out: "Agotado",
    finished: "Finalizado",
  }

  if (loading) {
    return (
      <AdminLayout title="Seminarios">
        <div className="flex justify-center">Cargando...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Seminarios">
      <div className="mb-6">
        <Link
          href="/admin/seminars/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nuevo Seminario
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
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
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
              {seminars.map((seminar) => (
                <tr key={seminar._id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={seminar.title}>
                          {seminar.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {seminar.instructor}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDateRange(seminar.startDate, seminar.endDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatPrice(seminar.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        seminar.status === "published"
                          ? "bg-green-100 text-green-800"
                          : seminar.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {statusLabels[seminar.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/seminars/${seminar._id}`}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/seminars/${seminar._id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(seminar._id!)}
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
        {seminars.map((seminar) => (
          <div key={seminar._id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 break-words">
                  {seminar.title}
                </h3>
                <p className="text-sm text-gray-500">{seminar.instructor}</p>
              </div>
              <span
                className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
                  seminar.status === "published"
                    ? "bg-green-100 text-green-800"
                    : seminar.status === "draft"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {statusLabels[seminar.status]}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-gray-500">Fecha:</span>
                <p className="font-medium">{formatDateRange(seminar.startDate, seminar.endDate)}</p>
              </div>
              <div>
                <span className="text-gray-500">Precio:</span>
                <p className="font-medium">{formatPrice(seminar.price)}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
              <Link
                href={`/admin/seminars/${seminar._id}`}
                className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                <Eye className="w-4 h-4 mr-1" />
                Ver
              </Link>
              <Link
                href={`/admin/seminars/${seminar._id}/edit`}
                className="flex items-center px-3 py-2 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
              >
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Link>
              <button
                onClick={() => handleDelete(seminar._id!)}
                className="flex items-center px-3 py-2 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {seminars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay seminarios registrados</p>
        </div>
      )}
    </AdminLayout>
  )
}
