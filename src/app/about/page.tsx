import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Check } from "lucide-react"

const teamMembers = [
  {
    name: "Alejandro Sandoval Nuñez",
    role: "Fundador - Director Ejecutivo",
    linkedinUrl: "https://www.linkedin.com/in/alejandro-sandoval-5127052b/",
  },
  {
    name: "Marcela Castro",
    role: "Coordinadora de Programas",
    linkedinUrl: "#",
  },
  {
    name: "Miguel Castro Prado",
    role: "Especialista en Formación Sindical",
    linkedinUrl: "#",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Quiénes Somos */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Quiénes Somos</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Grupo Impulso es una consultora especializada en la formación de líderes sociales y el
              fortalecimiento de organizaciones sindicales, comunitarias y territoriales.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Acompañamos procesos de desarrollo organizacional y relaciones laborales con un enfoque
              práctico, participativo y orientado a resultados. Somos expertos en el traspaso de
              competencias clave para la gestión, la negociación colectiva, la comunicación efectiva y las
              buenas prácticas en el mundo del trabajo.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Contamos con un equipo multidisciplinario de alta experiencia, comprometido con el
              desarrollo de las personas, los sindicatos y las comunidades.
            </p>
            <p className="text-gray-600 leading-relaxed text-justify">
              Desde nuestra sede en Santiago, operamos a lo largo de todo el país, diseñando e
              implementando programas formativos, asesorías técnicas y espacios de articulación entre
              trabajadores, empresas, instituciones públicas y territorios.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 mb-8">
            <p className="text-lg text-blue-800 font-semibold text-center">
              Grupo Impulso es más que una consultora: es una red de colaboración, confianza y
              aprendizaje colectivo.
            </p>
          </div>
        </div>

        {/* Nuestra Historia */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nuestra Historia</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Grupo Impulso nace desde mi experiencia como dirigente sindical en la minería, donde
              durante casi 20 años viví de cerca los desafíos del liderazgo, la negociación colectiva y la
              organización desde la base.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              A partir de esa trayectoria, y con la convicción de que los líderes se forman con herramientas,
              acompañamiento y visión, fundé esta consultora con un propósito claro: fortalecer el
              sindicalismo desde la ética, la estrategia y la formación continua.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Hoy lidero un equipo multidisciplinario que comparte ese compromiso. Acompañamos a
              sindicatos, organizaciones sociales y actores públicos y privados en procesos de
              transformación, poniendo siempre a las personas en el centro.
            </p>
            <p className="text-gray-600 leading-relaxed italic text-justify">
              Grupo Impulso es mi forma de seguir aportando al mundo del trabajo con rigor técnico,
              cercanía humana y visión de futuro.
            </p>
            <p className="text-sm text-gray-500 mt-4 font-semibold">
              Alejandro Sandoval Núñez, Fundador - Director Ejecutivo
            </p>
          </div>
        </div>

        {/* Visión */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Visión</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Impulsamos el fortalecimiento del sindicalismo con formación estratégica, asesoría
              técnica y compromiso con los trabajadores.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Acompañamos a sindicatos en Chile en su liderazgo, negociación colectiva y desarrollo
              organizacional, integrando innovación, inteligencia colectiva y vínculos con organizaciones de
              América Latina.
            </p>
            <p className="text-gray-600 leading-relaxed text-justify">
              Promovemos también el relacionamiento comunitario entre empresas, sindicatos y
              territorios, construyendo confianza, diálogo y cohesión social.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nuestros Valores</h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Presentes en cada alianza, cada formación y cada transformación que impulsamos:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">ÉTICA INTRANSABLE</h3>
              <p className="text-gray-600 mb-2 text-justify">Ponemos la dignidad de las personas en el centro.</p>
              <p className="text-gray-600 text-justify">Actuamos con coherencia, respeto y responsabilidad social.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">INNOVACIÓN CON SENTIDO</h3>
              <p className="text-gray-600 mb-2 text-justify">Usamos tecnología e inteligencia artificial para fortalecer capacidades reales.</p>
              <p className="text-gray-600 text-justify">Innovamos con raíces: lo nuevo al servicio del trabajo y la organización colectiva.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">VISIÓN DE FUTURO</h3>
              <p className="text-gray-600 mb-2 text-justify">Formamos hoy a quienes liderarán el mañana.</p>
              <p className="text-gray-600 text-justify">Anticipamos desafíos y promovemos pensamiento estratégico.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">COMPROMISO REAL</h3>
              <p className="text-gray-600 mb-2 text-justify">Nos involucramos activamente en cada proceso.</p>
              <p className="text-gray-600 text-justify">Caminamos junto a sindicatos, comunidades y territorios.</p>
            </div>
          </div>
        </div>

        {/* Equipo */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center">Nuestro Equipo</h2>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              En Grupo Impulso contamos con un equipo multidisciplinario de profesionales con amplia
              experiencia en formación sindical, negociación colectiva y desarrollo organizacional.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-justify">
              Hemos acompañado a decenas de sindicatos en procesos complejos, fortaleciendo sus
              capacidades estratégicas y formando líderes preparados para enfrentar con decisión y visión
              los desafíos del mundo del trabajo actual.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 text-justify">
              Nos une una convicción profunda: la formación transforma, y una buena negociación
              comienza mucho antes de sentarse a la mesa.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-6">Nuestro equipo está integrado por especialistas en:</h3>
            
            {/* Refactored checkbox section with blue checkboxes and horizontal alignment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 leading-relaxed">Diseño e implementación de programas de formación sindical</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 leading-relaxed">Asesoría técnica y estratégica en negociación colectiva</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 leading-relaxed">Liderazgo organizacional y cohesión de equipos sindicales</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 leading-relaxed">Comunicación para la incidencia y el diálogo social</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 leading-relaxed">Análisis jurídico-laboral y preparación de convenios colectivos</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 leading-relaxed">Evaluación de competencias y coaching para dirigentes</span>
              </div>
              <div className="flex items-start lg:col-span-2">
                <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded flex items-center justify-center mr-3 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-700 leading-relaxed">Inteligencia artificial aplicada a procesos de negociación y representación</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-justify">
              Trabajamos en todo el país con metodologías participativas, enfoque ético y compromiso
              territorial, adaptando cada intervención a las realidades y objetivos de cada organización.
              Más que consultores, somos aliados técnicos y formativos de los sindicatos que apuestan
              por liderazgos sólidos, procesos bien preparados y resultados sostenibles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {member.linkedinUrl !== "#" && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        Ver LinkedIn
                      </a>
                    )}
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