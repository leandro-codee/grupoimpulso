import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { findDocuments, insertDocument } from "@/lib/mongodb"
import { generateSlug } from "@/lib/utils"
import { Course } from "@/types"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const courses = await findDocuments(
      "courses",
      {},
      {
        skip,
        limit,
        sort: { createdAt: -1 },
      }
    )

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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    const courseData: Omit<Course, "_id"> = {
      ...body,
      slug: generateSlug(body.title),
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      availableSlots: body.totalSlots,
    }

    const result = await insertDocument("courses", courseData)

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...courseData },
    })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json(
      { success: false, error: "Error interno del servidor" },
      { status: 500 }
    )
  }
} 