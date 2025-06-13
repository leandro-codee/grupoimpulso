"use client"
import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Sale } from "@/types"
import { formatDate, formatPrice } from "@/lib/utils"

export default function AdminSalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    revenue: 0,
  })

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = async () => {
    try {
      const response = await fetch("/api/admin/sales")
      const result = await response.json()
      if (result.success) {
        setSales(result.data)
        calculateStats(result.data)
      }
      setLoading(false)
    } catch (error) {
      console.error("Error fetching sales:", error)
      setLoading(false)
    }
  }

  const calculateStats = (salesData: Sale[]) => {
    const stats = salesData.reduce(
      (acc, sale) => {
        acc.total += 1
        if (sale.status === "paid") {
          acc.paid += 1
          acc.revenue += sale.total
        } else if (sale.status === "pending") {
          acc.pending += 1
        }
        return acc
      },
      { total: 0, paid: 0, pending: 0, revenue: 0 }
    )

    setStats(stats)
  }

  const statusLabels = {
    pending: "Pendiente",
    paid: "Pagado",
    rejected: "Rechazado",
    refunded: "Reembolsado",
  }

  const paymentMethodLabels = {
    mercadopago: "Mercado Pago",
    transbank: "Transbank",
  }

  if (loading) {
    return (
      <AdminLayout title="Ventas">
        <div className="flex justify-center">Cargando...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Ventas">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Ventas</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
          <div className="text-sm text-gray-600">Pagadas</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <div className="text-sm text-gray-600">Pendientes</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(stats.revenue)}
          </div>
          <div className="text-sm text-gray-600">Ingresos</div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Número de Venta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Método de Pago
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {sale.saleNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {sale.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {sale.customerEmail}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatPrice(sale.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {paymentMethodLabels[sale.paymentMethod]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sale.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : sale.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : sale.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {statusLabels[sale.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(sale.saleDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
