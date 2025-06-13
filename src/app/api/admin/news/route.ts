import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { findDocuments, insertDocument } from "@/lib/mongodb"
import { generateSlug } from "@/lib/utils"
import { NewsArticle } from "@/types"

// export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const news = await findDocuments(
      "news",
      {},
      {
        skip,
        limit,
        sort: { createdAt: -1 },
      }
    )

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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const newsData: Omit<NewsArticle, "_id"> = {
      ...body,
      slug: generateSlug(body.title),
      publishDate: new Date(body.publishDate),
      author: session.user.name || session.user.email || "Admin",
      tags: body.tags || [],
    }

    const result = await insertDocument("news", newsData)

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...newsData },
    })
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json(
      { success: false, error: "Error al crear noticia" },
      { status: 500 }
    )
  }
}
