import { NextRequest, NextResponse } from 'next/server'

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

    // Crear contenido HTML para el email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
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

    // Enviar email usando la API de KiraCloud desde el servidor
    const response = await fetch('https://mails-api.kiracloud.dev/api/email/simple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: process.env.OWNER_EMAIL,
        subject: `${subject} - Mensaje de ${name}`,
        content: emailContent,
        from: 'no-reply'
      }),
    })

    if (!response.ok) {
      // Si KiraCloud falla, intentar con una API alternativa o enviar respuesta de error
      console.error('Error de KiraCloud:', response.status, await response.text())
      
      // Podríamos intentar con otra API aquí, pero por ahora retornamos error específico
      return NextResponse.json(
        { error: 'Error en el servicio de email. Por favor intenta nuevamente o contáctanos por WhatsApp.' },
        { status: 500 }
      )
    }

    const result = await response.json()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email enviado exitosamente',
      data: result 
    })

  } catch (error) {
    console.error('Error en API de contacto:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 