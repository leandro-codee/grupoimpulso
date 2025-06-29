const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

async function createInitialAdmin() {
  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    const db = client.db()

    // Check if admin user already exists
    const existingAdmin = await db
      .collection("users")
      .findOne({ role: "admin" })

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "admin123",
        12
      )

      await db.collection("users").insertOne({
        email: process.env.ADMIN_EMAIL || "admin@sindicato.cl",
        name: "Administrador",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      console.log("✅ Initial admin user created successfully")
      console.log(`Email: ${process.env.ADMIN_EMAIL || "admin@sindicato.cl"}`)
      console.log(`Password: ${process.env.ADMIN_PASSWORD || "admin123"}`)
    } else {
      console.log("ℹ️  Admin user already exists")
    }

    // Create indexes for better performance
    await db.collection("seminars").createIndex({ slug: 1 }, { unique: true })
    await db.collection("seminars").createIndex({ status: 1, eventDate: -1 })
    await db.collection("seminars").createIndex({ featured: 1 })

    await db.collection("news").createIndex({ slug: 1 }, { unique: true })
    await db.collection("news").createIndex({ status: 1, publishDate: -1 })
    await db.collection("news").createIndex({ category: 1 })
    await db.collection("news").createIndex({ featured: 1 })

    await db
      .collection("sales")
      .createIndex({ saleNumber: 1 }, { unique: true })
    await db.collection("sales").createIndex({ status: 1 })
    await db.collection("sales").createIndex({ seminarId: 1 })

    await db.collection("users").createIndex({ email: 1 }, { unique: true })

    // Create indexes for courses
    await db.collection("courses").createIndex({ slug: 1 }, { unique: true })
    await db.collection("courses").createIndex({ status: 1, startDate: 1 })
    await db.collection("courses").createIndex({ featured: 1 })
    await db.collection("courses").createIndex({ level: 1 })
    await db.collection("courses").createIndex({ category: 1 })

    console.log("✅ Database indexes created successfully")
  } catch (error) {
    console.error("❌ Error initializing database:", error)
  } finally {
    await client.close()
  }
}

// Run if called directly
if (require.main === module) {
  require("dotenv").config({ path: ".env.local" })
  createInitialAdmin()
}

module.exports = createInitialAdmin
