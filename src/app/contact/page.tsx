"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("El nombre es requerido");
      return false;
    }
    if (!formData.email.trim()) {
      setError("El email es requerido");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("El email no es válido");
      return false;
    }
    if (!formData.subject.trim()) {
      setError("El asunto es requerido");
      return false;
    }
    if (!formData.message.trim()) {
      setError("El mensaje es requerido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log(formData);
      // Enviar email usando nuestra API interna (evita CORS)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.error || "Error al enviar el mensaje");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos por WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">
            Contacto
          </h1>

          <p className="text-lg text-gray-600 text-center mb-12">
            ¿Tienes alguna consulta o te interesa colaborar con nosotros? No
            dudes en contactarnos.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">
                  Envíanos un mensaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                {success && (
                  <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-md">
                    <p className="text-green-700">
                      ¡Mensaje enviado exitosamente! Te responderemos pronto.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-md">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tu nombre"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="tu@email.com"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Asunto del mensaje"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Escribe tu mensaje aquí..."
                      required
                      disabled={loading}
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                        Enviando...
                      </>
                    ) : (
                      "📧 Enviar mensaje"
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Tu mensaje será enviado directamente a nuestro equipo
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    Información de contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* WhatsApp - Opción Principal */}
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-1">
                      <i className="fab fa-whatsapp text-white"></i>
                    </div>
                    <div className="flex gap-6 flex-wrap">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">WhatsApp</p>
                        <p className="text-gray-600">+56 9 9418 0834</p>
                        <p className="text-xs text-green-600 mb-2">
                          ¡Respuesta inmediata!
                        </p>
                        <button
                          onClick={() =>
                            window.open(
                              "https://api.whatsapp.com/send/?phone=%2B56994180834&text=Hola,%20me%20interesa%20conocer%20más%20sobre%20los%20servicios%20de%20Grupo%20Impulso&type=phone_number&app_absent=0",
                              "_blank"
                            )
                          }
                          className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                        >
                          <i className="fab fa-whatsapp"></i>
                          Escribir ahora
                        </button>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          2do whatsapp
                        </p>
                        <p className="text-gray-600">+56 9 9818 0995</p>
                        <p className="text-xs text-green-600 mb-2">
                          ¡Respuesta inmediata!
                        </p>
                        <button
                          onClick={() =>
                            window.open(
                              "https://api.whatsapp.com/send/?phone=%2B56998180995&text=Hola,%20me%20interesa%20conocer%20más%20sobre%20los%20servicios%20de%20Grupo%20Impulso&type=phone_number&app_absent=0",
                              "_blank"
                            )
                          }
                          className="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                        >
                          <i className="fab fa-whatsapp"></i>
                          Escribir ahora
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-xs">📱</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Teléfono</p>
                      <p className="text-gray-600">+56 9 9418 0834</p>
                      <p className="text-gray-600">+56 9 9818 0995</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-xs">📧</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Email</p>
                      <p className="text-gray-600">
                        <a href="mailto:impulso@grupoimpulso.cl">
                          impulso@grupoimpulso.cl
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-xs">📍</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Ubicación</p>
                      <p className="text-gray-600">Santiago, Chile</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    Horarios de atención
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-medium">Lunes a Viernes:</span> 9:00
                      - 18:00
                    </p>
                    <p>
                      <span className="font-medium">Sábados:</span> 9:00 - 13:00
                    </p>
                    <p>
                      <span className="font-medium">Domingos:</span> Cerrado
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
