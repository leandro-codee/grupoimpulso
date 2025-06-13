import { NextRequest, NextResponse } from "next/server"
import { findDocuments } from "@/lib/mongodb"

// export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const featured = searchParams.get("featured") === "true"
    const skip = (page - 1) * limit

    const query: any = { status: "published" }
    if (featured) {
      query.featured = true
    }

    const seminars = await findDocuments("seminars", query, {
      skip,
      limit,
      sort: { eventDate: -1 },
    })

    return NextResponse.json({
      success: true,
      data: seminars,
      page,
      hasMore: seminars.length === limit,
    })
  } catch (error) {
    console.error("Error fetching seminars:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener seminarios" },
      { status: 500 }
    )
  }
}
