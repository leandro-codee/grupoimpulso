import { NextRequest, NextResponse } from "next/server"
import { findOneDocument } from "@/lib/mongodb"

export async function GET(request: NextRequest, { params }: any) {
  try {
    const course = await findOneDocument("courses", {
      slug: params.slug,
      status: "published",
    })

    if (!course) {
      return NextResponse.json(
        { success: false, error: "Curso no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: course })
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener curso" },
      { status: 500 }
    )
  }
} 