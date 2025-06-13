import { NextRequest, NextResponse } from "next/server"

// Webhook for MercadoPago notifications
export async function POST(request: NextRequest) {
  try {
    console.log("POST request received for webhook /webhook")

    const { searchParams } = new URL(request.url)
    const topic = searchParams.get("topic")
    const id = searchParams.get("id")

    if (topic === "payment") {
      // Here you would process the payment notification
      // Update sale status based on the payment result
      // This is a simplified version - in production you'd want to verify the payment with MercadoPago API

      console.log(
        "Payment notification received: POSTPOSTPOSTPOSTPOSTPOSTPOST",
        {
          topic,
          id,
        }
      )

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

export async function PUT(request: NextRequest) {
  try {
    console.log("PUT request received for webhook /webhook")

    const { searchParams } = new URL(request.url)
    const topic = searchParams.get("topic")
    const id = searchParams.get("id")

    if (topic === "payment") {
      // Here you would process the payment notification
      // Update sale status based on the payment result
      // This is a simplified version - in production you'd want to verify the payment with MercadoPago API

      console.log(
        "Payment notification received: PUTPUTPUTPUTPUTPUTPUTPUTPUTPUT",
        {
          topic,
          id,
        }
      )

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
