"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import AdminLayout from "@/components/admin/AdminLayout"
import SeminarForm from "@/components/admin/SeminarForm"
import { Seminar } from "@/types"

export default function EditSeminarPage() {
  const params = useParams()
  const [seminar, setSeminar] = useState<Seminar | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchSeminar()
    }
  }, [params.id])

  const fetchSeminar = async () => {
    try {
      const response = await fetch(`/api/admin/seminars/${params.id}`)
      const result = await response.json()
      if (result.success) {
        setSeminar(result.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching seminar:", error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Editar Seminario">
        <div className="flex justify-center">Cargando...</div>
      </AdminLayout>
    )
  }

  if (!seminar) {
    return (
      <AdminLayout title="Editar Seminario">
        <div className="text-center">Seminario no encontrado</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Editar Seminario">
      <SeminarForm seminar={seminar} isEditing={true} />
    </AdminLayout>
  )
}
