import { NextRequest, NextResponse } from "next/server"
import { findOneDocument } from "@/lib/mongodb"

// export const runtime = "edge"

export async function GET(request: NextRequest, { params }: any) {
  try {
    const article = await findOneDocument("news", {
      slug: params.slug,
      status: "published",
    })

    if (!article) {
      return NextResponse.json(
        { success: false, error: "Noticia no encontrada" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: article })
  } catch (error) {
    console.error("Error fetching news article:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener noticia" },
      { status: 500 }
    )
  }
}
