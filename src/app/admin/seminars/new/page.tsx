import AdminLayout from "@/components/admin/AdminLayout"
import SeminarForm from "@/components/admin/SeminarForm"

export default function NewSeminarPage() {
  return (
    <AdminLayout title="Nuevo Seminario">
      <SeminarForm />
    </AdminLayout>
  )
}
