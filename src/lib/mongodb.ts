import { MongoClient, Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient>
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db()
}

export async function getCollection(name: string) {
  const db = await getDatabase()
  return db.collection(name)
}

// Helper functions for common operations
export async function findDocuments(
  collection: string,
  query = {},
  options = {}
) {
  const coll = await getCollection(collection)
  return coll.find(query, options).toArray()
}

export async function findOneDocument(collection: string, query = {}) {
  const coll = await getCollection(collection)
  return coll.findOne(query)
}

export async function insertDocument(collection: string, document: any) {
  const coll = await getCollection(collection)
  const now = new Date()
  return coll.insertOne({
    ...document,
    createdAt: now,
    updatedAt: now,
  })
}

export async function updateDocument(
  collection: string,
  query: any,
  update: any
) {
  const coll = await getCollection(collection)
  return coll.updateOne(query, {
    $set: {
      ...update,
      updatedAt: new Date(),
    },
  })
}

export async function deleteDocument(collection: string, query: any) {
  const coll = await getCollection(collection)
  return coll.deleteOne(query)
}

export default clientPromise
