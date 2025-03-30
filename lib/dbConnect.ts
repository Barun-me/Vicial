// lib/dbConnect.ts
import mongoose from "mongoose";

declare global {
  var mongooseCache: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

const MONGODB_URI: string = process.env.MONGODB_URI || ''; // Make sure this is set in your .env.local

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development to prevent creating too many connections.
 */
let cached: {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null
} = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Using cached connection to MongoDB");
    // Use existing cached connection
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB");
      // Set the connection to cached.conn to maintain a single connection instance
      return mongoose.connection;
    });
  }
  cached.conn = await cached.promise;
  if (!cached.conn) {
    throw new Error("Failed to establish a connection to MongoDB");
  }
  console.log("New connection to MongoDB established");
  // Set the connection to cached.conn to maintain a single connection instance
  return cached.conn;
}

export default dbConnect;
