import { NextRequest, NextResponse } from "next/server"
import { findDocuments } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const level = searchParams.get("level")
    const category = searchParams.get("category")
    const featured = searchParams.get("featured") === "true"
    const skip = (page - 1) * limit

    const query: any = { status: "published" }
    if (level && level !== "all") {
      query.level = level
    }
    if (category && category !== "all") {
      query.category = category
    }
    if (featured) {
      query.featured = true
    }

    const courses = await findDocuments("courses", query, {
      skip,
      limit,
      sort: { featured: -1, startDate: 1 },
    })

    return NextResponse.json({
      success: true,
      data: courses,
      page,
      hasMore: courses.length === limit,
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    )
  }
} 