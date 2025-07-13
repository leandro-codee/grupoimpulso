"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Seminar } from "@/types"
import { formatDate, formatPrice, isValidEmail, isValidRut } from "@/lib/utils"

const modalityLabels = {
  in_person: "Presencial",
  virtual: "Virtual",
  hybrid: "Híbrido",
}

export default function SeminarDetailPage() {
  const params = useParams()
  const [seminar, setSeminar] = useState<Seminar | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<
    "mercadopago" | "transbank"
  >("mercadopago")
  const [formData, setFormData] = useState({
    customerEmail: "",
    customerName: "",
    customerPhone: "",
    customerRut: "",
    customerAddress: "",
  })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchSeminar()
    }
  }, [params.slug])

  const fetchSeminar = async () => {
    try {
      const response = await fetch(`/api/seminars/${params.slug}`)
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

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.customerEmail) {
      errors.customerEmail = "El email es requerido"
    } else if (!isValidEmail(formData.customerEmail)) {
      errors.customerEmail = "Email inválido"
    }

    if (!formData.customerName.trim()) {
      errors.customerName = "El nombre es requerido"
    }

    if (!formData.customerPhone.trim()) {
      errors.customerPhone = "El teléfono es requerido"
    }

    if (!formData.customerRut.trim()) {
      errors.customerRut = "El RUT es requerido"
    } else if (!isValidRut(formData.customerRut)) {
      errors.customerRut = "RUT inválido"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handlePurchase = async () => {
    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const endpoint =
        paymentMethod === "mercadopago"
          ? "/api/payments/mercadopago"
          : "/api/payments/transbank"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seminarId: seminar!._id,
          ...formData,
          paymentMethod,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al procesar el pago")
      }

      if (paymentMethod === "mercadopago") {
        window.open(
          `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${data.preferenceId}`,
          "_blank"
        )
      } else {
        const form = document.createElement("form")
        form.method = "POST"
        form.action = data.url

        const tokenInput = document.createElement("input")
        tokenInput.type = "hidden"
        tokenInput.name = "token_ws"
        tokenInput.value = data.token

        form.appendChild(tokenInput)
        document.body.appendChild(form)
        form.submit()
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      alert(
        error instanceof Error
          ? error.message
          : "Error al procesar el pago. Intenta nuevamente."
      )
    } finally {
      setSubmitting(false)
    }
  }

  const handleWhatsAppRedirect = () => {
    if (!seminar) return;
    const message = encodeURIComponent(`Hola, quiero inscribirme en el seminario: ${seminar.title}`);
    window.open(`https://wa.me/56994180834?text=${message}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
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

  if (!seminar) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Seminario no encontrado
          </h1>
          <p className="text-gray-600">
            El seminario que buscas no existe o no está disponible.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {seminar.videoUrl && (
          <div className="w-full mb-8 flex justify-center">
            <video
              src={seminar.videoUrl}
              controls
              className="max-h-96 w-full rounded-lg border shadow"
            />
          </div>
        )}
        {seminar.featuredImage && (
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={seminar.featuredImage}
              alt={seminar.title}
              fill
              className="object-cover"
            />
            {seminar.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Destacado
                </span>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {seminar.title}
            </h1>

            <div className="prose prose-lg max-w-none mb-8">
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: seminar.description,
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Información del Seminario
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong>Fecha:</strong><br />
                      {formatDate(seminar.eventDate)}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong>Duración:</strong><br />
                      {seminar.duration}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong>Modalidad:</strong><br />
                      {modalityLabels[seminar.modality]}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong>Instructor:</strong><br />
                      {seminar.instructor}
                    </div>
                  </li>
                  {seminar.location && (
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong>Ubicación:</strong><br />
                        {seminar.location}
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Disponibilidad
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    <div>
                      <strong>Cupos totales:</strong><br />
                      {seminar.totalSlots}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong>Cupos disponibles:</strong><br />
                      {seminar.availableSlots}
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong>Precio:</strong><br />
                      <span className="text-lg font-bold text-blue-600">
                        {formatPrice(seminar.price)}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatPrice(seminar.price)}
                </div>
                <div className="text-sm text-gray-500">
                  {seminar.availableSlots} cupos disponibles
                </div>
              </div>

              {seminar.availableSlots > 0 ? (
                <div>
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold"
                  >
                    Inscribirse vía WhatsApp
                  </button>
                </div>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white py-3 px-4 rounded-md cursor-not-allowed font-semibold"
                >
                  Sin Cupos Disponibles
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
