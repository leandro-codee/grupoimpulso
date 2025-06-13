import { NextRequest, NextResponse } from "next/server"
import { findOneDocument } from "@/lib/mongodb"

// export const runtime = "edge"

export async function GET(request: NextRequest, { params }: any) {
  try {
    const seminar = await findOneDocument("seminars", {
      slug: params.slug,
      status: "published",
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
