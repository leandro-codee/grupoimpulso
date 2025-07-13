export interface User {
  _id?: string
  email: string
  name: string
  password?: string
  role: "admin" | "editor"
  createdAt?: Date
  updatedAt?: Date
}

export interface Seminar {
  _id?: string
  title: string
  slug: string
  description: string
  shortDescription: string
  featuredImage?: string
  videoUrl?: string
  eventDate: Date
  duration: string
  modality: "in_person" | "virtual" | "hybrid"
  price: number
  totalSlots: number
  availableSlots: number
  instructor: string
  location?: string
  virtualLink?: string
  status: "draft" | "published" | "sold_out" | "finished"
  featured: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Course {
  _id?: string
  title: string
  slug: string
  description: string
  shortDescription: string
  featuredImage?: string
  startDate: Date
  endDate: Date
  duration: string
  modality: "in_person" | "virtual" | "hybrid"
  price: number
  totalSlots: number
  availableSlots: number
  instructor: string
  location?: string
  virtualLink?: string
  status: "draft" | "published" | "sold_out" | "finished"
  featured: boolean
  level: "beginner" | "intermediate" | "advanced"
  category: "technical" | "management" | "safety" | "leadership"
  requirements?: string[]
  syllabus?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface NewsArticle {
  _id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  publishDate: Date
  author: string
  category: "general" | "announcements" | "events" | "training"
  tags: string[]
  status: "draft" | "published" | "hidden"
  featured: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Sale {
  _id?: string
  saleNumber: string
  itemId: string // Can be seminar or course ID
  itemType: "seminar" | "course"
  customerEmail: string
  customerName: string
  customerPhone: string
  customerRut: string
  customerAddress?: string
  total: number
  paymentMethod: "mercadopago" | "transbank"
  transactionId?: string
  status: "pending" | "paid" | "rejected" | "refunded"
  saleDate: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}
