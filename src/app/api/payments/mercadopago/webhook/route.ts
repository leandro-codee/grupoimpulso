import { NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Payment, PaymentRefund } from "mercadopago"
import { findOneDocument, updateDocument } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { formatDate, formatPrice } from "@/lib/utils"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

interface WebhookData {
  action: string
  api_version: string
  data: { id: string }
  date_created: string
  id: string
  live_mode: boolean
  type: string
  user_id: number
}

interface SaleData {
  _id: string
  saleNumber: string
  seminarId: string
  customerEmail: string
  customerName: string
  customerPhone: string
  customerRut: string
  total: number
  status: string
  paymentMethod: string
}

interface SeminarData {
  _id: string
  title: string
  eventDate: string
  duration: string
  instructor: string
  location?: string
  virtualLink?: string
  modality: string
  availableSlots: number
  price: number
}

// Email sending function
async function sendEmail(to: string, subject: string, content: string) {
  try {
    const response = await fetch(
      `${process.env.MAILS_API_URL}/api/email/simple`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          content,
          from: "no-reply",
        }),
      }
    )

    console.log("Email response status:", response.status)
    console.log("Email response headers:", response.headers)
    console.log("Email response body:", await response.text())

    if (!response.ok) {
      console.error("Failed to send email:", await response.text())
      return false
    }

    console.log("Email sent successfully to:", to)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// Generate confirmation email HTML
function generateConfirmationEmail(
  sale: SaleData,
  seminar: SeminarData
): string {
  const eventDate = formatDate(new Date(seminar.eventDate))
  const price = formatPrice(seminar.price)

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Confirmación de Inscripción</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #2563eb; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>¡Inscripción Confirmada!</h1>
            </div>
            <div class="content">
                <div class="success">
                    <strong>✅ Pago procesado exitosamente</strong><br>
                    Tu inscripción ha sido confirmada y ya tienes tu cupo asegurado.
                </div>

                <h2>Detalles de tu Seminario</h2>
                <div class="info-box">
                    <h3>${seminar.title}</h3>
                    <p><strong>📅 Fecha:</strong> ${eventDate}</p>
                    <p><strong>⏰ Duración:</strong> ${seminar.duration}</p>
                    <p><strong>👨‍🏫 Instructor:</strong> ${seminar.instructor}</p>
                    <p><strong>📍 Modalidad:</strong> ${
                      seminar.modality === "in_person"
                        ? "Presencial"
                        : seminar.modality === "virtual"
                        ? "Virtual"
                        : "Híbrido"
                    }</p>
                    ${
                      seminar.location
                        ? `<p><strong>🏢 Ubicación:</strong> ${seminar.location}</p>`
                        : ""
                    }
                    ${
                      seminar.virtualLink
                        ? `<p><strong>💻 Link Virtual:</strong> ${seminar.virtualLink}</p>`
                        : ""
                    }
                </div>

                <h2>Información de Compra</h2>
                <div class="info-box">
                    <p><strong>Número de Venta:</strong> ${sale.saleNumber}</p>
                    <p><strong>Cliente:</strong> ${sale.customerName}</p>
                    <p><strong>Email:</strong> ${sale.customerEmail}</p>
                    <p><strong>RUT:</strong> ${sale.customerRut}</p>
                    <p><strong>Total Pagado:</strong> ${price}</p>
                </div>

                <h2>Próximos Pasos</h2>
                <div class="info-box">
                    <ul>
                        <li>Guarda este email como comprobante de tu inscripción</li>
                        <li>Te contactaremos 24-48 horas antes del seminario con instrucciones adicionales</li>
                        ${
                          seminar.modality === "virtual" ||
                          seminar.modality === "hybrid"
                            ? "<li>El link para conectarte será enviado el día del evento</li>"
                            : ""
                        }
                        <li>Si tienes consultas, responde este email o contáctanos</li>
                    </ul>
                </div>

                <div class="footer">
                    <p>¡Nos vemos en el seminario!</p>
                    <p><strong>Equipo del Sindicato</strong></p>
                    <p>Este es un email automático, por favor no responder.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}

// Generate rejection email HTML
function generateRejectionEmail(sale: SaleData, seminar: SeminarData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Pago No Procesado</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #dc3545; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Pago No Procesado</h1>
            </div>
            <div class="content">
                <div class="error">
                    <strong>❌ El pago no pudo ser procesado</strong><br>
                    Tu inscripción para "${seminar.title}" no ha sido confirmada.
                </div>

                <div class="info-box">
                    <h3>¿Qué puedes hacer?</h3>
                    <ul>
                        <li>Verifica que tu tarjeta tenga fondos suficientes</li>
                        <li>Intenta nuevamente con otro método de pago</li>
                        <li>Contacta a tu banco si el problema persiste</li>
                        <li>Escríbenos si necesitas ayuda</li>
                    </ul>
                </div>

                <p><strong>Número de referencia:</strong> ${sale.saleNumber}</p>
                <p>Si tienes consultas, contáctanos con este número de referencia.</p>
            </div>
        </div>
    </body>
    </html>
  `
}

// Generate refund email HTML
function generateRefundEmail(sale: SaleData, seminar: SeminarData): string {
  const price = formatPrice(seminar.price)

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Reembolso Procesado</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ffc107; color: #212529; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #ffc107; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Reembolso Procesado</h1>
            </div>
            <div class="content">
                <div class="warning">
                    <strong>⚠️ Sin cupos disponibles - Reembolso automático</strong><br>
                    Lamentablemente, el seminario "${seminar.title}" se agotó mientras procesábamos tu pago.
                </div>

                <div class="info-box">
                    <h3>¿Qué hemos hecho?</h3>
                    <ul>
                        <li>✅ Procesamos un reembolso automático por ${price}</li>
                        <li>✅ El dinero será devuelto a tu método de pago original</li>
                        <li>✅ Recibirás la confirmación del reembolso por separado</li>
                    </ul>
                </div>

                <div class="info-box">
                    <h3>Tiempos de reembolso:</h3>
                    <ul>
                        <li>Tarjetas de débito: 1-3 días hábiles</li>
                        <li>Tarjetas de crédito: 3-10 días hábiles</li>
                        <li>Otros métodos: según el proveedor</li>
                    </ul>
                </div>

                <p><strong>Número de referencia:</strong> ${sale.saleNumber}</p>
                <p>Disculpa las molestias. Te notificaremos cuando abramos nuevas fechas para este seminario.</p>

                <div style="text-align: center; margin-top: 30px;">
                    <p><strong>Equipo del Sindicato</strong></p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `
}

// Método principal usando PaymentRefund
async function processRefund(
  paymentId: string,
  amount: number
): Promise<boolean> {
  try {
    const paymentRefund = new PaymentRefund(client)

    const refundResponse = await paymentRefund.create({
      payment_id: paymentId,
      body: {
        amount: amount,
      },
    })

    console.log("Refund processed:", refundResponse)
    return refundResponse.status === "approved"
  } catch (error) {
    console.error("Error processing refund:", error)
    return false
  }
}

// En caso de que PaymentRefund falle, usamos la API REST directamente
async function processRefundDirect(
  paymentId: string,
  amount: number
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}/refunds`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      }
    )

    const refundData = await response.json()
    console.log("Direct refund processed:", refundData)

    return response.ok && refundData.status === "approved"
  } catch (error) {
    console.error("Error processing direct refund:", error)
    return false
  }
}

// Main webhook handler
export async function POST(request: NextRequest) {
  try {
    console.log("🎯 MercadoPago webhook received")

    const webhookData: WebhookData = await request.json()
    console.log("📦 Webhook data:", JSON.stringify(webhookData, null, 2))

    // Only process payment notifications
    if (webhookData.type !== "payment") {
      console.log("ℹ️ Ignoring non-payment notification:", webhookData.type)
      return NextResponse.json({ received: true })
    }

    const paymentId = webhookData.data.id
    console.log("💳 Processing payment ID:", paymentId)

    // Get payment details from MercadoPago API
    const payment = new Payment(client)
    const paymentData = await payment.get({ id: paymentId })

    console.log("💰 Payment data:", JSON.stringify(paymentData, null, 2))

    if (!paymentData.external_reference) {
      console.error("❌ No external_reference found in payment")
      return NextResponse.json(
        { error: "No external reference" },
        { status: 400 }
      )
    }

    // Find the sale in our database
    const foundSale = await findOneDocument("sales", {
      _id: new ObjectId(paymentData.external_reference),
    })

    if (!foundSale) {
      console.error("❌ Sale not found:", paymentData.external_reference)
      return NextResponse.json({ error: "Sale not found" }, { status: 404 })
    }

    // Ahora asegura que result cumple con SaleData (puedes usar type assertion si confías en la estructura)
    const sale = foundSale as unknown as SaleData

    console.log("🛒 Sale found:", sale.saleNumber)

    // Get seminar details
    const seminar = (await findOneDocument("seminars", {
      _id: new ObjectId(sale.seminarId),
    })) as unknown as SeminarData

    if (!seminar) {
      console.error("❌ Seminar not found:", sale.seminarId)
      return NextResponse.json({ error: "Seminar not found" }, { status: 404 })
    }

    console.log("🎓 Seminar found:", seminar.title)

    // Process based on payment status
    switch (paymentData.status) {
      case "approved":
        console.log("✅ Payment approved, processing...")
        await handleApprovedPayment(paymentData, sale, seminar)
        break

      case "rejected":
        console.log("❌ Payment rejected")
        await handleRejectedPayment(sale, seminar)
        break

      case "cancelled":
        console.log("🚫 Payment cancelled")
        await handleCancelledPayment(sale, seminar)
        break

      case "pending":
        console.log("⏳ Payment pending")
        await handlePendingPayment(sale, seminar)
        break

      case "in_process":
        console.log("🔄 Payment in process")
        await handlePendingPayment(sale, seminar)
        break

      default:
        console.log("❓ Unknown payment status:", paymentData.status)
        break
    }

    return NextResponse.json({ received: true, status: "processed" })
  } catch (error) {
    console.error("💥 Error processing webhook:", error)
    return NextResponse.json(
      { success: false, error: "Error processing webhook" },
      { status: 500 }
    )
  }
}

// Handle approved payment
async function handleApprovedPayment(
  paymentData: any,
  sale: SaleData,
  seminar: SeminarData
) {
  console.log("🎯 Processing approved payment...")

  // Check if there are still available slots
  const currentSeminar = (await findOneDocument("seminars", {
    _id: new ObjectId(sale.seminarId),
  })) as unknown as SeminarData

  if (currentSeminar.availableSlots <= 0) {
    console.log("⚠️ No slots available, processing refund...")

    // Process refund
    // Intenta primero PaymentRefund, luego API directa
    let refundSuccess = await processRefund(paymentData.id, sale.total)

    if (!refundSuccess) {
      console.log("⚠️ Primary refund failed, trying direct API...")
      refundSuccess = await processRefundDirect(paymentData.id, sale.total)
    }

    if (refundSuccess) {
      // Update sale status to refunded
      await updateDocument(
        "sales",
        { _id: new ObjectId(sale._id) },
        {
          status: "refunded",
          transactionId: paymentData.id,
          refundReason: "no_slots_available",
        }
      )

      // Send refund email
      const emailContent = generateRefundEmail(sale, seminar)
      await sendEmail(
        sale.customerEmail,
        `Reembolso procesado - ${seminar.title}`,
        emailContent
      )

      console.log("✅ Refund processed and email sent")
    } else {
      console.error("❌ Failed to process refund")
      // Update status to require manual refund
      await updateDocument(
        "sales",
        { _id: new ObjectId(sale._id) },
        {
          status: "refund_pending",
          transactionId: paymentData.id,
          refundReason: "no_slots_available",
        }
      )
    }
    return
  }

  // There are slots available, process the purchase
  console.log("✅ Slots available, confirming purchase...")

  // Update sale status to paid
  await updateDocument(
    "sales",
    { _id: new ObjectId(sale._id) },
    {
      status: "paid",
      transactionId: paymentData.id,
    }
  )

  // Reduce available slots
  await updateDocument(
    "seminars",
    { _id: new ObjectId(sale.seminarId) },
    { availableSlots: currentSeminar.availableSlots - 1 }
  )

  // Send confirmation email
  const emailContent = generateConfirmationEmail(sale, seminar)
  await sendEmail(
    sale.customerEmail,
    `Confirmación de inscripción - ${seminar.title}`,
    emailContent
  )

  console.log("🎉 Purchase confirmed, slot reserved, email sent!")
}

// Handle rejected payment
async function handleRejectedPayment(sale: SaleData, seminar: SeminarData) {
  console.log("❌ Processing rejected payment...")

  // Update sale status to rejected
  await updateDocument(
    "sales",
    { _id: new ObjectId(sale._id) },
    { status: "rejected" }
  )

  // Send rejection email
  const emailContent = generateRejectionEmail(sale, seminar)
  await sendEmail(
    sale.customerEmail,
    `Pago no procesado - ${seminar.title}`,
    emailContent
  )

  console.log("📧 Rejection email sent")
}

// Handle cancelled payment
async function handleCancelledPayment(sale: SaleData, seminar: SeminarData) {
  console.log("🚫 Processing cancelled payment...")

  // Update sale status to cancelled
  await updateDocument(
    "sales",
    { _id: new ObjectId(sale._id) },
    { status: "cancelled" }
  )

  // Send cancellation email (similar to rejection)
  const emailContent = generateRejectionEmail(sale, seminar)
  await sendEmail(
    sale.customerEmail,
    `Pago cancelado - ${seminar.title}`,
    emailContent
  )

  console.log("📧 Cancellation email sent")
}

// Handle pending payment
async function handlePendingPayment(sale: SaleData, seminar: SeminarData) {
  console.log("⏳ Processing pending payment...")

  // Keep sale status as pending (no change needed)
  console.log("ℹ️ Payment still pending, no action taken")

  // Optionally send a pending email
  const emailContent = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #ffc107; color: #212529; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                <h1>Pago Pendiente</h1>
            </div>
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <strong>⏳ Tu pago está siendo procesado</strong><br>
                    Estamos verificando tu pago para "${seminar.title}". Te notificaremos cuando esté confirmado.
                </div>
                <p><strong>Número de referencia:</strong> ${sale.saleNumber}</p>
                <p>Este proceso puede tomar algunos minutos. Por favor, no realices otro pago.</p>
            </div>
        </div>
    </body>
    </html>
  `

  await sendEmail(
    sale.customerEmail,
    `Pago en proceso - ${seminar.title}`,
    emailContent
  )

  console.log("📧 Pending email sent")
}
