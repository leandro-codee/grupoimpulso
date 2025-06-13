"use client"
import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import Link from "next/link"
import { Seminar } from "@/types"
import { formatDate, formatPrice } from "@/lib/utils"

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

      <div className="bg-white shadow rounded-lg overflow-hidden">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {seminars.map((seminar) => (
              <tr key={seminar._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {seminar.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {seminar.instructor}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(seminar.eventDate)}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    href={`/admin/seminars/${seminar._id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(seminar._id!)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
