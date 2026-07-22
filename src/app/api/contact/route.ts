import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validar datos requeridos
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // La API key se carga desde la variable de entorno RESEND_API_KEY.
    // Se lee dentro del handler (lazy) para no romper el build si falta.
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY no está configurada')
      return NextResponse.json(
        { error: 'El servicio de email no está configurado. Por favor contáctanos por WhatsApp.' },
        { status: 500 }
      )
    }

    // Remitente: debe ser un dominio verificado en Resend.
    // Configurable vía CONTACT_FROM_EMAIL; por defecto el dominio de Grupo Impulso.
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || 'Grupo Impulso <no-reply@grupoimpulso.cl>'
    // Destinatario (dueño del sitio). Configurable vía OWNER_EMAIL.
    const toEmail = process.env.OWNER_EMAIL || 'impulso@grupoimpulso.cl'

    // Crear contenido HTML para el email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1f2937; border-bottom: 2px solid #5798df; padding-bottom: 10px;">
          Nuevo mensaje desde Grupo Impulso
        </h1>

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0;">Información del contacto:</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
        </div>

        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="color: #374151; margin-top: 0;">Mensaje:</h3>
          <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>Este mensaje fue enviado desde el formulario de contacto de <strong>Grupo Impulso</strong></p>
          <p>Fecha: ${new Date().toLocaleString('es-CL')}</p>
        </div>
      </div>
    `

    // Enviar email usando Resend
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email, // responder va directo a quien escribió
      subject: `${subject} - Mensaje de ${name}`,
      html: emailContent,
    })

    if (error) {
      console.error('Error de Resend:', error)
      return NextResponse.json(
        { error: 'Error en el servicio de email. Por favor intenta nuevamente o contáctanos por WhatsApp.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Email enviado exitosamente',
      data,
    })
  } catch (error) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
