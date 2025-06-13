"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import Link from "next/link"
import { Seminar } from "@/types"
import { formatDate, formatPrice } from "@/lib/utils"

export default function SeminarDetailPage() {
  const params = useParams()
  const [seminar, setSeminar] = useState<Seminar | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchSeminar()
    }
  }, [params.id])

  const fetchSeminar = async () => {
    try {
      const response = await fetch(`/api/admin/seminars/${params.id}`)
      const result = await response.json()
      if (result.success) {
        setSeminar(result.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching seminar:", error)
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

  if (loading) {
    return (
      <AdminLayout title="Detalle del Seminario">
        <div className="flex justify-center">Cargando...</div>
      </AdminLayout>
    )
  }

  if (!seminar) {
    return (
      <AdminLayout title="Detalle del Seminario">
        <div className="text-center">Seminario no encontrado</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={`Seminario: ${seminar.title}`}>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {seminar.title}
            </h2>
            <p className="text-gray-600">{seminar.shortDescription}</p>
          </div>
          <div className="flex space-x-2">
            <Link
              href={`/admin/seminars/${seminar._id}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Editar
            </Link>
            <Link
              href="/admin/seminars"
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
                <dt className="text-sm font-medium text-gray-500">
                  Instructor:
                </dt>
                <dd className="text-sm text-gray-900">{seminar.instructor}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Fecha del Evento:
                </dt>
                <dd className="text-sm text-gray-900">
                  {formatDate(seminar.eventDate)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Duración:</dt>
                <dd className="text-sm text-gray-900">{seminar.duration}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Modalidad:
                </dt>
                <dd className="text-sm text-gray-900">
                  {modalityLabels[seminar.modality]}
                </dd>
              </div>
              {seminar.location && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Ubicación:
                  </dt>
                  <dd className="text-sm text-gray-900">{seminar.location}</dd>
                </div>
              )}
              {seminar.virtualLink && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Link Virtual:
                  </dt>
                  <dd className="text-sm text-gray-900">
                    <a
                      href={seminar.virtualLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {seminar.virtualLink}
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
                  {formatPrice(seminar.price)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Cupos Totales:
                </dt>
                <dd className="text-sm text-gray-900">{seminar.totalSlots}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Cupos Disponibles:
                </dt>
                <dd className="text-sm text-gray-900">
                  {seminar.availableSlots}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Estado:</dt>
                <dd>
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
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Destacado:
                </dt>
                <dd className="text-sm text-gray-900">
                  {seminar.featured ? "Sí" : "No"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">URL:</dt>
                <dd className="text-sm text-gray-900">
                  <Link
                    href={`/seminars/${seminar.slug}`}
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                  >
                    /seminars/{seminar.slug}
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Descripción Completa
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">
              {seminar.description}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
