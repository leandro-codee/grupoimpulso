import { MongoClient, Db } from "mongodb"

const options = {}

// Inicialización lazy: NO se conecta ni se valida el env al importar el módulo.
// Esto evita que `next build` falle en "Collecting page data" cuando la ruta
// API se importa sin MONGODB_URI disponible. La conexión (y la validación del
// env) ocurre recién en el primer uso real, en tiempo de request.
let clientPromise: Promise<MongoClient> | undefined

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Please add your MongoDB URI to .env.local")
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    const client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }

  return clientPromise
}

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise()
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
