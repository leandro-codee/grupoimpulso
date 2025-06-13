import { NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { findOneDocument, insertDocument, updateDocument } from "@/lib/mongodb"
import { generateSaleNumber } from "@/lib/utils"
import { validateData, saleSchema } from "@/lib/validations"
import { ObjectId } from "mongodb"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

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
      paymentMethod: "mercadopago",
      status: "pending",
      saleDate: new Date(),
    })

    // Create MercadoPago preference
    const preference = new Preference(client)

    console.log("process.env.NEXTAUTH_URL: ", process.env.NEXTAUTH_URL)

    console.log("seminar.price: ", seminar.price)

    const response = await preference.create({
      body: {
        items: [
          {
            id: seminarId,
            title: seminar.title,
            quantity: 1,
            unit_price: seminar.price,
            currency_id: "CLP",
          },
        ],
        payer: {
          name: customerData.customerName,
          email: customerData.customerEmail,
          phone: {
            number: customerData.customerPhone,
          },
        },
        back_urls: {
          success: `${process.env.NEXTAUTH_URL}/seminars/payment-success?sale=${sale.insertedId}`,
          failure: `${process.env.NEXTAUTH_URL}/seminars/payment-failed?sale=${sale.insertedId}`,
          pending: `${process.env.NEXTAUTH_URL}/seminars/payment-pending?sale=${sale.insertedId}`,
        },
        //auto_return: "approved",
        external_reference: sale.insertedId.toString(),
        //notification_url: `${process.env.NEXTAUTH_URL}/api/payments/mercadopago/webhook`,
      },
    })

    return NextResponse.json({
      success: true,
      preferenceId: response.id,
      saleId: sale.insertedId,
    })
  } catch (error) {
    console.error("Error creating MercadoPago preference:", error)
    return NextResponse.json(
      { success: false, error: "Error al procesar el pago" },
      { status: 500 }
    )
  }
}

// Webhook for MercadoPago notifications
export async function PUT(request: NextRequest) {
  try {
    console.log("PUT request received for webhook /")

    const { searchParams } = new URL(request.url)
    const topic = searchParams.get("topic")
    const id = searchParams.get("id")

    if (topic === "payment") {
      // Here you would process the payment notification
      // Update sale status based on the payment result
      // This is a simplified version - in production you'd want to verify the payment with MercadoPago API

      console.log("Payment notification received:", { topic, id })

      return NextResponse.json({ received: true })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { success: false, error: "Error processing webhook" },
      { status: 500 }
    )
  }
}
