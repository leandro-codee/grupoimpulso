"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Seminar } from "@/types"
import { formatDateRange, formatPrice } from "@/lib/utils"

const modalityLabels = {
  in_person: "Presencial",
  virtual: "Virtual",
  hybrid: "Híbrido",
}

const modalityStyles = {
  in_person: "bg-emerald-100 text-emerald-800",
  virtual: "bg-blue-100 text-blue-800",
  hybrid: "bg-purple-100 text-purple-800",
}

// Texto de cupos: número explícito o simplemente "Cupos disponibles".
function slotsText(seminar: Seminar): string {
  if (seminar.hideSlots) return "Cupos disponibles"
  return `${seminar.availableSlots} cupos disponibles`
}

function priceText(price: number): string {
  return price > 0 ? formatPrice(price) : "Gratuito"
}

const CalendarIcon = () => (
  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
      clipRule="evenodd"
    />
  </svg>
)

const UserIcon = () => (
  <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Placeholder cuando el seminario no tiene imagen.
const ImagePlaceholder = ({ title }: { title: string }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-6">
    <span className="text-white text-lg font-semibold text-center line-clamp-3">
      {title}
    </span>
  </div>
)

// Card destacada para el seminario más próximo.
function FeaturedSeminar({ seminar }: { seminar: Seminar }) {
  return (
    <div className="mb-12 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-blue-100 transition-shadow hover:shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Imagen */}
        <div className="relative h-64 lg:h-auto lg:min-h-[22rem] w-full overflow-hidden group">
          {seminar.featuredImage ? (
            <Image
              src={seminar.featuredImage}
              alt={seminar.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          ) : (
            <ImagePlaceholder title={seminar.title} />
          )}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-lg">
              🔥 Próximo seminario
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex flex-col justify-center p-8 lg:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${modalityStyles[seminar.modality]}`}
            >
              {modalityLabels[seminar.modality]}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {priceText(seminar.price)}
            </span>
          </div>

          <h2 className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl">
            {seminar.title}
          </h2>

          <p className="mb-6 text-gray-600 line-clamp-3">
            {seminar.shortDescription}
          </p>

          <div className="mb-6 space-y-2 text-sm text-gray-600">
            <div className="flex items-center text-blue-700">
              <CalendarIcon />
              <span className="font-medium">
                {formatDateRange(seminar.startDate, seminar.endDate)}
              </span>
            </div>
            <div className="flex items-center">
              <ClockIcon />
              {seminar.duration}
            </div>
            <div className="flex items-center">
              <UserIcon />
              {seminar.instructor}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {slotsText(seminar)}
            </span>
            <Link
              href={`/seminars/${seminar.slug}`}
              className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
            >
              Ver detalles
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Card estándar del grid.
function SeminarCard({ seminar }: { seminar: Seminar }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 w-full overflow-hidden">
        {seminar.featuredImage ? (
          <Image
            src={seminar.featuredImage}
            alt={seminar.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <ImagePlaceholder title={seminar.title} />
        )}

        {/* Chips sobre la imagen */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${modalityStyles[seminar.modality]}`}
          >
            {modalityLabels[seminar.modality]}
          </span>
          {seminar.featured && (
            <span className="rounded-full bg-yellow-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              Destacado
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-900 line-clamp-2">
          {seminar.title}
        </h3>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {seminar.shortDescription}
        </p>

        <div className="mb-4 space-y-2 text-sm text-gray-500">
          <div className="flex items-center text-blue-700">
            <CalendarIcon />
            <span className="font-medium">
              {formatDateRange(seminar.startDate, seminar.endDate)}
            </span>
          </div>
          <div className="flex items-center">
            <ClockIcon />
            {seminar.duration}
          </div>
          <div className="flex items-center">
            <UserIcon />
            {seminar.instructor}
          </div>
        </div>

        {/* Footer pegado abajo */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {slotsText(seminar)}
          </span>
          <Link
            href={`/seminars/${seminar.slug}`}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  )
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

  // Ordenar por fecha de inicio y destacar el más próximo (que aún no termina).
  const sortedByDate = [...seminars].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )
  const nowTs = Date.now()
  const featured =
    sortedByDate.find((s) => new Date(s.endDate).getTime() >= nowTs) ??
    sortedByDate[0] ??
    null
  const rest = sortedByDate.filter((s) => s._id !== featured?._id)

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

      {featured && <FeaturedSeminar seminar={featured} />}

      {rest.length > 0 && (
        <>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Más seminarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((seminar) => (
              <SeminarCard key={seminar._id} seminar={seminar} />
            ))}
          </div>
        </>
      )}

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
