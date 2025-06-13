"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { NewsArticle } from "@/types"
import { formatDate } from "@/lib/utils"

const categoryLabels = {
  general: "Noticias Generales",
  announcements: "Comunicados",
  events: "Eventos",
  training: "Capacitación",
}

export default function NewsDetailPage() {
  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([])

  useEffect(() => {
    if (params.slug) {
      fetchArticle()
    }
  }, [params.slug])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/news/${params.slug}`)
      const result = await response.json()
      if (result.success) {
        setArticle(result.data)

        // Get related news from the same category
        const relatedResponse = await fetch(
          `/api/news?category=${result.data.category}&limit=3`
        )
        const relatedResult = await relatedResponse.json()
        if (relatedResult.success) {
          setRelatedNews(
            relatedResult.data.filter(
              (n: NewsArticle) => n._id !== result.data._id
            )
          )
        }
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching news article:", error)
      setLoading(false)
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

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Noticia no encontrada
          </h1>
          <p className="text-gray-600 mb-4">
            La noticia que buscas no existe o no está disponible.
          </p>
          <Link
            href="/news"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Volver a Noticias
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link
            href="/news"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Volver a Noticias
          </Link>
        </nav>

        <article>
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {categoryLabels[article.category] || article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            <div className="flex items-center text-gray-600 mb-4">
              <span>Por {article.author}</span>
              <span className="mx-2">•</span>
              <span>{formatDate(article.publishDate)}</span>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed">
              {article.excerpt}
            </p>
          </header>

          {article.featuredImage && (
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, "<br />"),
              }}
            />
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Etiquetas:
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related news */}
        {relatedNews.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Noticias Relacionadas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((related) => (
                <article
                  key={related._id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {related.featuredImage && (
                    <div className="relative h-32 w-full">
                      <Image
                        src={related.featuredImage}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {related.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {related.excerpt}
                    </p>

                    <Link
                      href={`/news/${related.slug}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Leer más →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
