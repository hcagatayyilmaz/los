import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}
declare global {
  var mongoose: {conn: any; promise: any} | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {conn: null, promise: null}
}
global.mongoose = {conn: null, promise: null}

async function dbConnect() {
  if (cached?.conn) {
    return cached.conn
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false
    }

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  if (cached) {
    cached.conn = await cached.promise
    return cached.conn
  }

  throw new Error("Failed to initialize MongoDB connection")
}

export default dbConnect
