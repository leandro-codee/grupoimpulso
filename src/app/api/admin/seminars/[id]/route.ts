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

    const seminar = await findOneDocument("seminars", {
      _id: new ObjectId(params.id),
    })

    if (!seminar) {
      return NextResponse.json(
        { success: false, error: "Seminario no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: seminar })
  } catch (error) {
    console.error("Error fetching seminar:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener seminario" },
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
      eventDate: new Date(body.eventDate),
    }

    const result = await updateDocument(
      "seminars",
      { _id: new ObjectId(params.id) },
      updateData
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Seminario no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Seminario actualizado",
    })
  } catch (error) {
    console.error("Error updating seminar:", error)
    return NextResponse.json(
      { success: false, error: "Error al actualizar seminario" },
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

    const result = await deleteDocument("seminars", {
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Seminario no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, message: "Seminario eliminado" })
  } catch (error) {
    console.error("Error deleting seminar:", error)
    return NextResponse.json(
      { success: false, error: "Error al eliminar seminario" },
      { status: 500 }
    )
  }
}
