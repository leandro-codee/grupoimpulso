export default function WhatWeDoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">En qué estamos</h1>
            <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto">
              Proyectos actuales y actividades en desarrollo
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Actividades Formativas y Seminarios</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Espacios de aprendizaje estratégico para líderes sindicales y equipos de trabajo.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Desarrollamos programas de formación adaptados a las realidades del mundo laboral, con
              metodologías participativas, enfoque práctico y contenidos actualizados.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nuestros seminarios —nacionales e internacionales— permiten fortalecer habilidades, compartir
              experiencias y construir visión colectiva para afrontar los desafíos del trabajo y la organización
              sindical.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Aquí se pueden agregar tarjetas de proyectos actuales */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Seminarios Internacionales 2024</h3>
              <p className="text-gray-600 mb-4">
                Serie de seminarios con expertos internacionales en negociación colectiva y liderazgo sindical.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 font-medium">En desarrollo</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Ver detalles</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Escuelas de Formación Sindical</h3>
              <p className="text-gray-600 mb-4">
                Programas de capacitación continua para bases, asambleas y socios de sindicatos.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600 font-medium">Activo</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Ver detalles</button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Coaching para Equipos Negociadores</h3>
              <p className="text-gray-600 mb-4">
                Acompañamiento especializado para la preparación de procesos de negociación colectiva.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 font-medium">Próximamente</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Ver detalles</button>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              ¿Quieres participar en nuestras actividades?
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Mantente informado sobre nuestros próximos seminarios y programas de formación.
            </p>
            <div className="text-center">
              <a
                href="/contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 