import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { findOneDocument, updateDocument, deleteDocument } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { generateSlug } from "@/lib/utils"

export async function GET(request: NextRequest, { params }: any) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      )
    }

    const course = await findOneDocument("courses", {
      _id: new ObjectId(params.id),
    })

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Curso no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: course,
    })
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: any) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    const updateData = {
      ...body,
      slug: generateSlug(body.title),
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
    }

    const result = await updateDocument(
      "courses",
      { _id: new ObjectId(params.id) },
      updateData
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Curso no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Curso actualizado exitosamente",
    })
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      )
    }

    const result = await deleteDocument("courses", {
      _id: new ObjectId(params.id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Curso no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Curso eliminado exitosamente",
    })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    )
  }
} 