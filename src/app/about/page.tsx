import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from "lucide-react"

const teamMembers = [
  {
    name: "Alejandro Sandoval Nuñez",
    role: "Director Ejecutivo",
    linkedinUrl: "https://www.linkedin.com/in/alejandro-sandoval-5127052b/",
  },
  {
    name: "Pedro Fuentes Sepúlveda",
    role: "Ejecutivo",
    linkedinUrl: "https://www.linkedin.com/in/pedro-antonio-fuentes-sep%C3%BAlveda-3b4525105/",
  },
]

export default function NuestroEquipoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Sección Quienes Somos */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Quienes Somos</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestra Historia</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Grupo Impulso nace como una iniciativa comprometida con el desarrollo integral de las comunidades,
              reconociendo la riqueza de la diversidad cultural y la importancia de trabajar de manera colaborativa para
              generar cambios positivos.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Desde nuestros inicios, hemos trabajado con un enfoque intercultural, valorando los saberes ancestrales y
              promoviendo el diálogo entre diferentes culturas para construir un futuro más inclusivo y equitativo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Nuestra Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser una organización líder en el desarrollo comunitario, reconocida por nuestro compromiso con la
                inclusión, la sostenibilidad y el respeto por la diversidad cultural.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Nuestros Valores</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Respeto por la diversidad cultural</li>
                <li>• Compromiso con la comunidad</li>
                <li>• Transparencia en nuestro trabajo</li>
                <li>• Sostenibilidad en nuestras acciones</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección Nuestro Equipo */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Nuestro Equipo</h2>

          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Nuestro equipo está conformado por profesionales comprometidos con el desarrollo comunitario y el trabajo
            intercultural, cada uno aportando su experiencia y conocimientos para lograr nuestros objetivos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                      <span className="text-white text-2xl font-bold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      Ver LinkedIn
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 