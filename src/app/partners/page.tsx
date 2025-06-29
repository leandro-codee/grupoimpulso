export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">Con Quién Trabajamos</h1>
            <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto">
              Alianzas estratégicas que fortalecen el mundo del trabajo
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              En Grupo Impulso creemos que los cambios sostenibles se construyen con colaboración, visión
              compartida y compromiso mutuo.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <p className="text-gray-700 leading-relaxed mb-6">
              Por eso trabajamos junto a sindicatos, empresas, instituciones públicas, municipios y
              organizaciones sociales que apuestan por el fortalecimiento de las personas y el desarrollo
              organizacional.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nuestra trayectoria nos ha permitido acompañar procesos en distintas regiones y sectores
              productivos, consolidando una red de confianza con actores clave del mundo laboral y social.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Construimos relaciones de largo plazo, basadas en la ética, la confidencialidad y la búsqueda de
              resultados concretos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🌐</span>
                ¿Quiénes confían en nosotros?
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Sindicatos:</h3>
                  <p className="text-gray-600 ml-4">minería, salud, banca, energía, servicios, retail y sector público.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Empresas:</h3>
                  <p className="text-gray-600 ml-4">compañías líderes en minería, manufactura, servicios y transporte.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Gobiernos locales y regionales:</h3>
                  <p className="text-gray-600 ml-4">municipios, divisiones de desarrollo local, organismos de participación.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Organizaciones sociales y comunitarias:</h3>
                  <p className="text-gray-600 ml-4">que trabajan por la equidad, el liderazgo ciudadano y el desarrollo territorial.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🧭</span>
                ¿Qué nos une?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <p className="text-gray-700">La convicción de que las personas transforma realidades.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <p className="text-gray-700">La certeza de que la formación y la negociación estratégica mejoran el trabajo y la vida.</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <p className="text-gray-700">El compromiso de construir organizaciones más justas, eficientes y sostenibles.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logos de empresas y sindicatos */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Nuestros Aliados Estratégicos
            </h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {/* Aquí se pueden agregar los logos de las empresas y sindicatos */}
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/codelco-el-teniente.jpeg"
                  alt="Codelco División El Teniente"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/sindicato-el-soldado.jpeg"
                  alt="Sindicato N°3 El Soldado"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/codelco-hales.jpeg"
                  alt="Codelco División Ministro Hales"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/sindicato-zaldivar.jpeg"
                  alt="Sindicato Minera Zaldivar"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/spence.jpeg"
                  alt="Minera Spence S.A."
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/Minera-Candelaria-300.jpeg"
                  alt="Minera Candelaria"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/aguas-andina.jpeg"
                  alt="Aguas Andinas"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/smlp-logo.jpeg"
                  alt="SMLP"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/universidad-central.jpeg"
                  alt="Universidad Central"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/angloamerican.jpeg"
                  alt="Anglo American"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/centinela.jpeg"
                  alt="Centinela Antofagasta Minerals"
                />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img
                  className="h-12 w-auto object-contain"
                  src="/cropped-LogoSindicatoGrandeTrasparente.jpeg"
                  alt="Sindicato"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 