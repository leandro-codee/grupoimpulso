"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { NewsArticle } from "@/types"
import { formatDate } from "@/lib/utils"

const categoryLabels = {
  general: "Noticias Generales",
  announcements: "Comunicados",
  events: "Eventos",
  training: "Capacitación",
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const categories = [
    { value: "", label: "Todas las categorías" },
    { value: "general", label: "Noticias Generales" },
    { value: "announcements", label: "Comunicados" },
    { value: "events", label: "Eventos" },
    { value: "training", label: "Capacitación" },
  ]

  useEffect(() => {
    fetchNews()
  }, [page, categoryFilter])

  const fetchNews = async () => {
    try {
      let url = `/api/news?page=${page}&limit=12`
      if (categoryFilter) {
        url += `&category=${categoryFilter}`
      }

      const response = await fetch(url)
      const result = await response.json()
      if (result.success) {
        setNews(result.data)
        setHasMore(result.hasMore)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching news:", error)
      setLoading(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category)
    setPage(1)
    setLoading(true)
  }

  const shareArticle = (article: NewsArticle, platform: string) => {
    const url = `${window.location.origin}/news/${article.slug}`
    const text = `${article.title} - ${article.excerpt}`
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`)
        break
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Noticias de Interés
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          En esta sección compartimos información clave para dirigentes sindicales, organizaciones sociales y
          actores laborales que buscan estar al día y tomar decisiones informadas.
        </p>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aquí encontrarás:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <strong>Actualidad laboral y legislativa</strong><br />
                Cambios en leyes, dictámenes y normativas que afectan directamente al mundo del trabajo.
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <strong>Relaciones laborales y negociación colectiva</strong><br />
                Casos, buenas prácticas y aprendizajes de procesos recientes en sindicatos de distintas industrias.
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <strong>Formación y liderazgo sindical</strong><br />
                Novedades sobre nuestros programas, entrevistas a dirigentes y reflexiones sobre el rol sindical hoy.
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <strong>Innovación y tecnología aplicada al trabajo</strong><br />
                Uso de inteligencia artificial, digitalización y automatización en el mundo laboral y sindical.
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <div>
                <strong>Vínculos con comunidades y territorios</strong><br />
                Experiencias de articulación entre sindicatos, empresas y actores locales en procesos de desarrollo.
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Actualizamos esta sección periódicamente para que tengas a mano lo más relevante del escenario
            laboral, sindical y social.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <select
          value={categoryFilter}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <article
            key={article._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {article.featuredImage && (
              <div className="relative h-48 w-full">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6">
              {article.featured && (
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mb-2">
                  Destacado
                </span>
              )}

              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {categoryLabels[article.category] || article.category}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>Por {article.author}</span>
                <span>{formatDate(article.publishDate)}</span>
              </div>

              {article.tags && article.tags.length > 0 && (
                <div className="mb-4">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-2 mb-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share buttons */}
              <div className="flex items-center justify-between mb-4">
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Leer más
                </Link>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => shareArticle(article, 'twitter')}
                    className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    title="Compartir en Twitter"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button
                    onClick={() => shareArticle(article, 'facebook')}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Compartir en Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => shareArticle(article, 'linkedin')}
                    className="p-2 text-gray-400 hover:text-blue-700 transition-colors"
                    title="Compartir en LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => shareArticle(article, 'whatsapp')}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    title="Compartir en WhatsApp"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              setPage(page + 1)
              setLoading(true)
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Cargar más noticias
          </button>
        </div>
      )}
    </div>
  )
}
