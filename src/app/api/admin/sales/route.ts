import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { findDocuments } from "@/lib/mongodb"

// export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    const skip = (page - 1) * limit

    const sales = await findDocuments(
      "sales",
      {},
      {
        skip,
        limit,
        sort: { createdAt: -1 },
      }
    )

    return NextResponse.json({
      success: true,
      data: sales,
      page,
      hasMore: sales.length === limit,
    })
  } catch (error) {
    console.error("Error fetching sales:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener ventas" },
      { status: 500 }
    )
  }
}
