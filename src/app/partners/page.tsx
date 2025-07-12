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
          <div className="bg-white border border-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Nuestros Aliados Estratégicos
            </h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {/* Logos agregados automáticamente desde la carpeta public que empiezan con 'image' */}
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image1.png" alt="Aliado estratégico 1" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image2.png" alt="Aliado estratégico 2" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image3.png" alt="Aliado estratégico 3" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image4.png" alt="Aliado estratégico 4" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image5.png" alt="Aliado estratégico 5" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image6.jpg" alt="Aliado estratégico 6" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image7.jpg" alt="Aliado estratégico 7" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image9.jpg" alt="Aliado estratégico 8" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image10.gif" alt="Aliado estratégico 9" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image11.png" alt="Aliado estratégico 10" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image12.jpg" alt="Aliado estratégico 11" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image13.jpg" alt="Aliado estratégico 12" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image14.png" alt="Aliado estratégico 13" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image15.jpg" alt="Aliado estratégico 14" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image16.png" alt="Aliado estratégico 15" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image17.jpg" alt="Aliado estratégico 16" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image18.jpg" alt="Aliado estratégico 17" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image19.png" alt="Aliado estratégico 18" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image20.png" alt="Aliado estratégico 19" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image21.jpg" alt="Aliado estratégico 20" />
              </div>
              <div className="col-span-1 flex justify-center items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <img className="h-12 w-auto object-contain" src="/image22.jpg" alt="Aliado estratégico 21" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 