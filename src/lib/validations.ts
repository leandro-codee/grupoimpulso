import { z } from "zod"

// Seminar validation schema
export const seminarSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(200, "El título es muy largo"),
  description: z.string().min(1, "La descripción es requerida"),
  shortDescription: z
    .string()
    .min(1, "La descripción corta es requerida")
    .max(200, "La descripción corta es muy larga"),
  eventDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida"),
  duration: z.string().min(1, "La duración es requerida"),
  modality: z.enum(["in_person", "virtual", "hybrid"], {
    errorMap: () => ({ message: "Modalidad inválida" }),
  }),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  totalSlots: z.number().min(1, "Debe haber al menos 1 cupo"),
  instructor: z.string().min(1, "El instructor es requerido"),
  location: z.string().optional(),
  virtualLink: z.string().url("URL inválida").optional().or(z.literal("")),
  status: z.enum(["draft", "published", "sold_out", "finished"], {
    errorMap: () => ({ message: "Estado inválido" }),
  }),
  featured: z.boolean().default(false),
  featuredImage: z.string().optional(),
})

// News validation schema
export const newsSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(200, "El título es muy largo"),
  excerpt: z
    .string()
    .min(1, "El resumen es requerido")
    .max(300, "El resumen es muy largo"),
  content: z.string().min(1, "El contenido es requerido"),
  publishDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Fecha inválida"),
  category: z.enum(["general", "announcements", "events", "training"], {
    errorMap: () => ({ message: "Categoría inválida" }),
  }),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published", "hidden"], {
    errorMap: () => ({ message: "Estado inválido" }),
  }),
  featured: z.boolean().default(false),
  featuredImage: z.string().optional(),
})

// Sale validation schema
export const saleSchema = z.object({
  seminarId: z.string().min(1, "ID de seminario requerido"),
  customerEmail: z.string().email("Email inválido"),
  customerName: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre es muy largo"),
  customerPhone: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .max(15, "El teléfono es muy largo"),
  customerRut: z.string().min(8, "RUT inválido").max(12, "RUT inválido"),
  customerAddress: z.string().optional(),
  paymentMethod: z.enum(["mercadopago", "transbank"], {
    errorMap: () => ({ message: "Método de pago inválido" }),
  }),
})

// User validation schema
export const userSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre es muy largo"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["admin", "editor"], {
    errorMap: () => ({ message: "Rol inválido" }),
  }),
})

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
})

// Helper function to validate data
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: any
): { success: boolean; data?: T; errors?: string[] } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => err.message),
      }
    }
    return {
      success: false,
      errors: ["Error de validación desconocido"],
    }
  }
}

// RUT validation function
export function validateRut(rut: string): boolean {
  const cleanRut = rut.replace(/[^0-9kK]/g, "")
  if (cleanRut.length < 8) return false

  const body = cleanRut.slice(0, -1)
  const dv = cleanRut.slice(-1).toUpperCase()

  let sum = 0
  let multiplier = 2

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const remainder = sum % 11
  const calculatedDv =
    remainder < 2
      ? remainder.toString()
      : remainder === 10
      ? "K"
      : (11 - remainder).toString()

  return dv === calculatedDv
}

// Email validation function
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Chilean phone validation
export function validateChileanPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[^0-9]/g, "")
  // Chilean phone numbers: 8 digits for mobile, 9 digits with area code
  return cleanPhone.length >= 8 && cleanPhone.length <= 11
}

// Password strength validation
export function validatePasswordStrength(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push("La contraseña debe tener al menos 8 caracteres")
  }

  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push("Incluye al menos una letra minúscula")
  }

  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push("Incluye al menos una letra mayúscula")
  }

  if (/[0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push("Incluye al menos un número")
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1
  } else {
    feedback.push("Incluye al menos un carácter especial")
  }

  return {
    isValid: score >= 3,
    score,
    feedback,
  }
}
