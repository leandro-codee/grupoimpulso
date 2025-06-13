import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { findOneDocument, updateDocument, deleteDocument } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { generateSlug } from "@/lib/utils"

// export const runtime = "edge"

export async function GET(request: NextRequest, { params }: any) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const article = await findOneDocument("news", {
      _id: new ObjectId(params.id),
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

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const updateData = {
      ...body,
      slug: generateSlug(body.title),
      publishDate: new Date(body.publishDate),
      tags: body.tags || [],
    }

    const result = await updateDocument(
      "news",
      { _id: new ObjectId(params.id) },
      updateData
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Noticia no encontrada" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: "Noticia actualizada" })
  } catch (error) {
    console.error("Error updating news article:", error)
    return NextResponse.json(
      { success: false, error: "Error al actualizar noticia" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const result = await deleteDocument("news", {
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Noticia no encontrada" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: "Noticia eliminada" })
  } catch (error) {
    console.error("Error deleting news article:", error)
    return NextResponse.json(
      { success: false, error: "Error al eliminar noticia" },
      { status: 500 }
    )
  }
}
