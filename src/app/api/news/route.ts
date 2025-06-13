import { NextRequest, NextResponse } from "next/server"
import { findDocuments } from "@/lib/mongodb"

// export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const featured = searchParams.get("featured") === "true"
    const skip = (page - 1) * limit

    const query: any = { status: "published" }
    if (category) {
      query.category = category
    }
    if (featured) {
      query.featured = true
    }

    const news = await findDocuments("news", query, {
      skip,
      limit,
      sort: { publishDate: -1 },
    })

    return NextResponse.json({
      success: true,
      data: news,
      page,
      hasMore: news.length === limit,
    })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener noticias" },
      { status: 500 }
    )
  }
}
