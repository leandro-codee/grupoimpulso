import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { findDocuments, insertDocument } from "@/lib/mongodb"
import { generateSlug } from "@/lib/utils"
import { Seminar } from "@/types"

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

    const seminars = await findDocuments(
      "seminars",
      {},
      {
        skip,
        limit,
        sort: { createdAt: -1 },
      }
    )

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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const seminarData: Omit<Seminar, "_id"> = {
      ...body,
      slug: generateSlug(body.title),
      eventDate: new Date(body.eventDate),
      availableSlots: body.totalSlots,
    }

    const result = await insertDocument("seminars", seminarData)

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...seminarData },
    })
  } catch (error) {
    console.error("Error creating seminar:", error)
    return NextResponse.json(
      { success: false, error: "Error al crear seminario" },
      { status: 500 }
    )
  }
}
