"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import NewsForm from "@/components/admin/NewsForm"
import { NewsArticle } from "@/types"

export default function EditNewsPage() {
  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchArticle()
    }
  }, [params.id])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/admin/news/${params.id}`)
      const result = await response.json()
      if (result.success) {
        setArticle(result.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching article:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Editar Noticia">
        <div className="flex justify-center">Cargando...</div>
      </AdminLayout>
    )
  }

  if (!article) {
    return (
      <AdminLayout title="Editar Noticia">
        <div className="text-center">Noticia no encontrada</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Editar Noticia">
      <NewsForm article={article} isEditing={true} />
    </AdminLayout>
  )
}
