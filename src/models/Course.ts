import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200,
  },
  featuredImage: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  modality: {
    type: String,
    enum: ["in_person", "virtual", "hybrid"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  totalSlots: {
    type: Number,
    required: true,
    min: 1,
  },
  availableSlots: {
    type: Number,
    required: true,
    min: 0,
  },
  instructor: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  virtualLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ["draft", "published", "sold_out", "finished"],
    default: "draft",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  category: {
    type: String,
    enum: ["technical", "management", "safety", "leadership"],
    required: true,
  },
  requirements: [{
    type: String,
  }],
  syllabus: [{
    type: String,
  }],
}, {
  timestamps: true,
})

export const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema) 