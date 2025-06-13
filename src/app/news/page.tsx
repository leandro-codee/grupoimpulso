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
          Noticias y Comunicados
        </h1>
        <p className="text-xl text-gray-600">
          Mantente informado sobre las últimas novedades del sindicato
        </p>
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

              <Link
                href={`/news/${article.slug}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Leer más
              </Link>
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
