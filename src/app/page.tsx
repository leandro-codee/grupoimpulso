import Link from "next/link"

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-600">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              Bienvenidos y Bienvenidas
            </h1>
            <div className="flex justify-center space-x-8 text-xl text-blue-200 mb-8">
              <span>Küme akukonpayaymun</span>
              <span>•</span>
              <span>Napaykunakuy</span>
              <span>•</span>
              <span>He aroha</span>
            </div>

            <p className="max-w-4xl mx-auto text-xl text-blue-100">
              Consultora Sindical especializada en el fortalecimiento del liderazgo 
              y la capacitación de dirigentes sindicales a través de seminarios 
              internacionales y coaching especializado.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                href="/seminars"
                className="bg-white text-blue-800 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors shadow-lg"
              >
                Seminarios Internacionales
              </Link>
              <Link
                href="/news"
                className="bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-800 transition-colors border border-blue-500"
              >
                Noticias
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Área de Gestión y Desarrollo */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Área de Gestión y Desarrollo
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Apoyamos a los nuevos líderes en procesos de negociación colectiva, 
              mejoramos las relaciones laborales y fortalecemos las herramientas 
              de gestión para las directivas sindicales.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Nuestro Enfoque
              </h3>
              <p className="text-gray-600 mb-4">
                Acortamos las brechas de las organizaciones de menores recursos, 
                renovando el impulso y liderazgo institucional. Buscamos impulsar 
                un liderazgo que apunte hacia la dignidad del servicio comunitario.
              </p>
              <p className="text-gray-600">
                El objetivo es que los dirigentes generen un cambio vital en la sociedad, 
                siendo fuentes permanentes de consulta para gobiernos locales y 
                parlamentarios.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Visión de Futuro
              </h3>
              <p className="text-gray-600 mb-4">
                Creamos una nueva sociedad donde los trabajadores sean parte de 
                los modelos productivos, haciendo partícipes a los empresarios 
                en la capacitación de sus trabajadores.
              </p>
              <p className="text-gray-600 italic">
                "Un colaborador capacitado no es una amenaza, sino un aporte, 
                un instrumento a la mejora de relaciones laborales para ambas partes"
              </p>
              <p className="text-sm text-gray-500 mt-2">
                - Alejandro Sandoval, Director Ejecutivo de Grupo Impulso
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Nuestros Servicios
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Ofrecemos capacitación especializada y consultoría sindical de calidad
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center">
                <svg
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Seminarios Internacionales
              </h3>
              <p className="mt-2 text-gray-600">
                Seminarios estratégicos para dirigentes sindicales con 
                perspectivas internacionales en América Latina
              </p>
            </div>

            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center">
                <svg
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Coaching Sindical
              </h3>
              <p className="mt-2 text-gray-600">
                Coaching especializado para sindicatos mineros, bancarios 
                y de diversos sectores productivos
              </p>
            </div>

            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center">
                <svg
                  className="h-12 w-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                Negociación Colectiva
              </h3>
              <p className="mt-2 text-gray-600">
                Apoyo especializado en procesos de negociación colectiva 
                y mejora de relaciones laborales
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nuestra alianza con */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Nuestra alianza con:
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Trabajamos junto a las principales empresas y organizaciones del país
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {/* Codelco División El Teniente */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/codelco-el-teniente.jpeg"
                alt="Codelco División El Teniente"
              />
            </div>
            
            {/* Sindicato N°3 El Soldado */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/sindicato-el-soldado.jpeg"
                alt="Sindicato N°3 El Soldado"
              />
            </div>
            
            {/* Codelco División Ministro Hales */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/codelco-hales.jpeg"
                alt="Codelco División Ministro Hales"
              />
            </div>
            
            {/* Sindicato Minera Zaldivar */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/sindicato-zaldivar.jpeg"
                alt="Sindicato Minera Zaldivar"
              />
            </div>
            
            {/* Minera Spence */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/spence.jpeg"
                alt="Minera Spence S.A."
              />
            </div>
            
            {/* Candelaria */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/Minera-Candelaria-300.jpeg"
                alt="Minera Candelaria"
              />
            </div>
            
            {/* Aguas Andinas */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/aguas-andina.jpeg"
                alt="Aguas Andinas"
              />
            </div>
            
            {/* SMLP */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/smlp-logo.jpeg"
                alt="SMLP"
              />
            </div>
            
            {/* Universidad Central */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/universidad-central.jpeg"
                alt="Universidad Central"
              />
            </div>
            
            {/* Anglo American */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/angloamerican.jpeg"
                alt="Anglo American"
              />
            </div>
            
            {/* Centinela Antofagasta Minerals */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/centinela.jpeg"
                alt="Centinela Antofagasta Minerals"
              />
            </div>
            
            {/* Logo Sindicato Grande */}
            <div className="col-span-1 flex justify-center items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img
                className="h-12 w-auto object-contain"
                src="/cropped-LogoSindicatoGrandeTrasparente.jpeg"
                alt="Sindicato"
              />
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
