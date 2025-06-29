import Link from "next/link"

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo placeholder - agregar logo aquí */}
            <div className="mb-8">
              <span className="text-3xl font-bold text-white">GRUPO IMPULSO</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              Bienvenidas y Bienvenidos a Grupo Impulso
            </h1>

            <p className="max-w-4xl mx-auto text-xl text-blue-100 mb-8">
              Consultora sindical especializada en el fortalecimiento del liderazgo y la formación estratégica de
              dirigentes y equipos sindicales.
            </p>

            <p className="max-w-4xl mx-auto text-lg text-blue-200 mb-8">
              Diseñamos e implementamos seminarios internacionales, programas de capacitación y procesos de
              coaching especializado, preparación de Equipos Negociadores, para transformar el trabajo,
              potenciar la negociación colectiva y fortalecer la acción sindical.
            </p>

            <p className="max-w-3xl mx-auto text-xl text-white font-semibold mb-10">
              Formamos líderes. Acompañamos procesos. Impulsamos resultados.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/seminars"
                className="bg-white text-blue-800 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors shadow-lg"
              >
                Ver Seminarios Internacionales
              </Link>
              <Link
                href="/news"
                className="bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-800 transition-colors border border-blue-500"
              >
                Noticias y Actualidad
              </Link>
              <Link
                href="/what-we-do"
                className="bg-transparent text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors border border-white"
              >
                En qué estamos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slogan Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Desde las personas transformamos el trabajo
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Formamos liderazgos, fortalecemos equipos y hacemos crecer organizaciones que construyen futuro.
          </p>
        </div>
      </div>

      {/* Área de Gestión y Desarrollo */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Área de Gestión y Desarrollo
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
              Acompañamos procesos de negociación colectiva, mejoramos las relaciones laborales y
              potenciamos la gestión sindical con enfoque estratégico, práctico y comprometido.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nuestro Enfoque
              </h3>
              <p className="text-gray-600 mb-4">
                En Grupo Impulso trabajamos para reducir las brechas formativas y estratégicas que
                dificultan una relación sindical–empresarial moderna, dialogante y productiva.
              </p>
              <p className="text-gray-600 mb-4">
                Acompañamos a sindicatos que quieren fortalecer su liderazgo, renovar su impulso
                institucional y posicionarse como actores legítimos y preparados dentro de sus espacios
                laborales. Apostamos por un liderazgo sindical capaz de representar con firmeza, negociar con
                visión y proponer con fundamentos.
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-black">Nuestro foco está en el fortalecimiento de la confianza, la preparación técnica y el diálogo
                estratégico entre sindicatos y empresas</span>, entendiendo que las buenas relaciones laborales se
                construyen, no se improvisan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Visión de Futuro
              </h3>
              <p className="text-gray-600 mb-4">
                Visualizamos un escenario donde las y los trabajadores participan activamente en los
                modelos productivos, y donde las empresas entienden que invertir en el desarrollo de sus
                equipos es una estrategia, no una concesión.
              </p>
              <p className="text-gray-600 mb-6">
                Impulsamos relaciones laborales colaborativas, sin perder la autonomía ni la esencia del rol
                sindical: representar con dignidad, negociar con fuerza y construir acuerdos sostenibles.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700 italic">
                  "Un trabajador formado no debilita la relación laboral: la potencia.
                  Es un actor estratégico en la producción, un facilitador del diálogo y una palanca real para
                  mejorar los procesos, la convivencia y los resultados."
                </p>
                <p className="text-sm text-gray-600 mt-2 font-semibold">
                  — Alejandro Sandoval Núñez, Director Ejecutivo de Grupo Impulso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              🛠 Nuestros Servicios
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Formación, asesoría y acompañamiento estratégico para fortalecer liderazgos, relaciones
              laborales y organizaciones sindicales.
            </p>
            <p className="mt-4 text-gray-600 max-w-4xl mx-auto">
              Trabajamos con metodologías participativas, enfoque práctico y compromiso con
              resultados que marcan la diferencia en el mundo del trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">🌎</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Seminarios Nacionales e Internacionales
              </h3>
              <p className="text-gray-600 mb-4 font-medium">
                Formación vivencial con mirada global y compromiso territorial.
              </p>
              <p className="text-gray-600">
                Diseñamos seminarios estratégicos para dirigentes sindicales, conectando experiencias y aprendizajes
                de América Latina y el mundo del trabajo a nivel internacional.
              </p>
            </div>

            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">🧭</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Coaching Sindical
              </h3>
              <p className="text-gray-600 mb-4 font-medium">
                Acompañamiento estratégico para dirigentes y equipos sindicales.
              </p>
              <p className="text-gray-600">
                Fortalecemos el liderazgo, la cohesión interna y la toma de decisiones en sindicatos de la minería,
                salud, banca y otros sectores productivos.
              </p>
            </div>

            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Negociación Colectiva
              </h3>
              <p className="text-gray-600 mb-4 font-medium">
                Asesoría estratégica para negociar con solidez y fortalecer las relaciones laborales.
              </p>
              <p className="text-gray-600">
                Acompañamos a sindicatos en todas las etapas del proceso negociador, con enfoque técnico, político y
                humano, adaptado a distintos contextos laborales.
              </p>
            </div>

            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">🧑🏫</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Formación Sindical
              </h3>
              <p className="text-gray-600 mb-4 font-medium">
                Programas de capacitación diseñados para liderazgos efectivos y sostenibles.
              </p>
              <p className="text-gray-600 mb-4">
                Impartimos talleres, escuelas de líderes y formación continua con metodologías participativas y foco en
                resultados reales.
              </p>
              <p className="text-sm text-black font-bold">
                Escuelas Sindicales de formación para bases, asambleas y socios del sindicato
              </p>
            </div>

            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">
                <span className="text-4xl">⚖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Relaciones Laborales
              </h3>
              <p className="text-gray-600 mb-4 font-medium">
                Fortalecemos la calidad del vínculo entre sindicatos y empresas.
              </p>
              <p className="text-gray-600">
                Apoyamos en la construcción de entornos laborales colaborativos, en la prevención de conflictos y en
                el desarrollo de buenas prácticas laborales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Propósito Section */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
              Nuestro Propósito: Ser tu aliado estratégico para transformar realidades
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700">
              <p>
                En Grupo Impulso acompañamos a sindicatos, organizaciones sociales y actores territoriales
                en el fortalecimiento de su capital humano, con formación continua, certificación de
                competencias y entrenamiento estratégico.
              </p>
              <p>
                Trabajamos junto a municipios, empresas y organismos públicos para acortar brechas de
                aprendizaje, potenciar equipos y liderar procesos de cambio con excelencia humana y
                tecnológica.
              </p>
              <p>
                Creamos experiencias formativas de alto impacto para organizaciones que quieren avanzar,
                profesionalizarse y dejar huella.
              </p>
            </div>
            <div className="mt-8 p-6 bg-blue-600 text-white rounded-lg inline-block">
              <p className="text-lg font-semibold">
                🔹 Si tu organización busca crecer con propósito, cuéntanos. Estamos para impulsarte.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para fortalecer tu liderazgo?</span>
            <span className="block text-blue-200">
              Únete a nuestros seminarios y coaching sindical.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 space-x-4">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/seminars"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-white hover:bg-gray-50"
              >
                Ver Seminarios
              </Link>
            </div>
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/news"
                className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-blue-700"
              >
                Noticias
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
