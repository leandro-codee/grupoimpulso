import AdminLayout from "@/components/admin/AdminLayout"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Seminarios
          </h3>
          <p className="text-gray-600 mb-4">
            Gestiona tus seminarios y capacitaciones
          </p>
          <Link
            href="/admin/seminars"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Ver Seminarios
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Noticias</h3>
          <p className="text-gray-600 mb-4">Publica noticias y comunicados</p>
          <Link
            href="/admin/news"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Ver Noticias
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ventas</h3>
          <p className="text-gray-600 mb-4">Revisa las inscripciones y pagos</p>
          <Link
            href="/admin/sales"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            Ver Ventas
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}
