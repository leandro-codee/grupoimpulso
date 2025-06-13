import { NextRequest, NextResponse } from "next/server"
import { WebpayPlus } from "transbank-sdk"
import { findOneDocument, insertDocument } from "@/lib/mongodb"
import { generateSaleNumber } from "@/lib/utils"
import { validateData, saleSchema } from "@/lib/validations"
import { ObjectId } from "mongodb"

// export const runtime = "edge"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input data
    const validation = validateData(saleSchema, body)
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.errors?.join(", ") },
        { status: 400 }
      )
    }

    const { seminarId, ...customerData } = validation.data!

    // Get seminar data
    const seminar = await findOneDocument("seminars", {
      _id: new ObjectId(seminarId),
      status: "published",
    })

    if (!seminar) {
      return NextResponse.json(
        { success: false, error: "Seminario no disponible" },
        { status: 404 }
      )
    }

    if (seminar.availableSlots <= 0) {
      return NextResponse.json(
        { success: false, error: "No hay cupos disponibles" },
        { status: 400 }
      )
    }

    // Create sale record
    const saleNumber = generateSaleNumber()
    const sale = await insertDocument("sales", {
      saleNumber,
      seminarId,
      ...customerData,
      total: seminar.price,
      paymentMethod: "transbank",
      status: "pending",
      saleDate: new Date(),
    })

    // // Configure Transbank
    // if (process.env.TRANSBANK_ENVIRONMENT === "production") {
    //   WebpayPlus.configureForProduction(
    //     process.env.TRANSBANK_API_KEY!,
    //     process.env.TRANSBANK_API_KEY!
    //   )
    // } else {
    //   WebpayPlus.configureForTesting()
    // }

    // // Create transaction
    // const response = await WebpayPlus.Transaction.create(
    //   saleNumber,
    //   sale.insertedId.toString(),
    //   seminar.price,
    //   `${process.env.NEXTAUTH_URL}/seminars/transbank-return`
    // )

    return NextResponse.json({
      success: true,
      // token: response.token,
      // url: response.url,
      saleId: sale.insertedId,
    })
  } catch (error) {
    console.error("Error creating Transbank transaction:", error)
    return NextResponse.json(
      { success: false, error: "Error al procesar el pago" },
      { status: 500 }
    )
  }
}
