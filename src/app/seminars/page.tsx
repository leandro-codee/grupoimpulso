"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Seminar } from "@/types"
import { formatDate, formatPrice } from "@/lib/utils"

const modalityLabels = {
  in_person: "Presencial",
  virtual: "Virtual",
  hybrid: "Híbrido",
}

export default function SeminarsPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSeminars()
  }, [])

  const fetchSeminars = async () => {
    try {
      const response = await fetch("/api/seminars")
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Seminarios y Capacitaciones
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Fortalece tus conocimientos con nuestros seminarios especializados
        </p>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Nuestros seminarios incluyen:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <strong>Capacitación especializada</strong><br />
                Contenido actualizado y relevante para dirigentes sindicales
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <strong>Modalidades flexibles</strong><br />
                Presencial, virtual o híbrida según tus necesidades
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <strong>Instructores expertos</strong><br />
                Profesionales con amplia experiencia en el área laboral
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <strong>Certificación</strong><br />
                Obtén certificados que respalden tu formación
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {seminars.map((seminar) => (
          <div
            key={seminar._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {seminar.featuredImage && (
              <div className="relative h-48 w-full">
                <Image
                  src={seminar.featuredImage}
                  alt={seminar.title}
                  fill
                  className="object-cover"
                />
                {seminar.featured && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                      Destacado
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="p-6">
              {!seminar.featuredImage && seminar.featured && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                  Destacado
                </span>
              )}

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {seminar.title}
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {seminar.shortDescription}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formatDate(seminar.eventDate)}
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {seminar.duration}
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {modalityLabels[seminar.modality]}
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {seminar.instructor}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(seminar.price)}
                  </span>
                  <div className="text-sm text-gray-500">
                    {seminar.availableSlots} cupos disponibles
                  </div>
                </div>

                <Link
                  href={`/seminars/${seminar.slug}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {seminars.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay seminarios disponibles
          </h3>
          <p className="text-gray-600">
            Pronto tendremos nuevos seminarios disponibles. ¡Mantente atento!
          </p>
        </div>
      )}
    </div>
  )
}
