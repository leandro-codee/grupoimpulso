import AdminLayout from "../../../../components/admin/AdminLayout"
import NewsForm from "../../../../components/admin/NewsForm"

export default function NewNewsPage() {
  return (
    <AdminLayout title="Nueva Noticia">
      <NewsForm />
    </AdminLayout>
  )
}
