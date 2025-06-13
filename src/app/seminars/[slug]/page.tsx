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
    customerEmail: "leandrocode2785@gmail.com",
    customerName: "leandro",
    customerPhone: "+56997867697",
    customerRut: "210641394",
    customerAddress: "almirante opas",
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
        // Redirect to MercadoPago
        //window.location.href = `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${data.preferenceId}`

        window.open(
          `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${data.preferenceId}`,
          "_blank"
        )
      } else {
        // Redirect to Transbank
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
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
      <div className="max-w-4xl mx-auto">
        {seminar.featuredImage && (
          <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={seminar.featuredImage}
              alt={seminar.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {seminar.title}
            </h1>

            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {seminar.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Información del Seminario
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <strong>Fecha:</strong> {formatDate(seminar.eventDate)}
                  </li>
                  <li>
                    <strong>Duración:</strong> {seminar.duration}
                  </li>
                  <li>
                    <strong>Modalidad:</strong>{" "}
                    {modalityLabels[seminar.modality]}
                  </li>
                  <li>
                    <strong>Instructor:</strong> {seminar.instructor}
                  </li>
                  {seminar.location && (
                    <li>
                      <strong>Ubicación:</strong> {seminar.location}
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Disponibilidad
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <strong>Cupos totales:</strong> {seminar.totalSlots}
                  </li>
                  <li>
                    <strong>Cupos disponibles:</strong> {seminar.availableSlots}
                  </li>
                  <li>
                    <strong>Precio:</strong> {formatPrice(seminar.price)}
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
                  {!showPaymentForm ? (
                    <button
                      onClick={() => setShowPaymentForm(true)}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Inscribirse Ahora
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">
                        Datos de Inscripción
                      </h3>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="customerEmail"
                          value={formData.customerEmail}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.customerEmail
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        {formErrors.customerEmail && (
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.customerEmail}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.customerName
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        {formErrors.customerName && (
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.customerName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          name="customerPhone"
                          value={formData.customerPhone}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.customerPhone
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        {formErrors.customerPhone && (
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.customerPhone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          RUT *
                        </label>
                        <input
                          type="text"
                          name="customerRut"
                          value={formData.customerRut}
                          onChange={handleChange}
                          placeholder="12.345.678-9"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.customerRut
                              ? "border-red-300"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        {formErrors.customerRut && (
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.customerRut}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dirección
                        </label>
                        <input
                          type="text"
                          name="customerAddress"
                          value={formData.customerAddress}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Método de Pago
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="mercadopago"
                              checked={paymentMethod === "mercadopago"}
                              onChange={(e) =>
                                setPaymentMethod(
                                  e.target.value as "mercadopago"
                                )
                              }
                              className="mr-2"
                            />
                            Mercado Pago
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="transbank"
                              checked={paymentMethod === "transbank"}
                              onChange={(e) =>
                                setPaymentMethod(e.target.value as "transbank")
                              }
                              className="mr-2"
                            />
                            Transbank (WebPay)
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={handlePurchase}
                          disabled={submitting}
                          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
                        >
                          {submitting ? "Procesando..." : "Proceder al Pago"}
                        </button>

                        <button
                          onClick={() => setShowPaymentForm(false)}
                          className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
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
