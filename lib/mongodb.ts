import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  throw new Error("Please add your Mongo URI to the .env file (DATABASE_URL)");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDb() {
  const connectedClient = await clientPromise;

  // Extract database name from DATABASE_URL if not set
  let dbName = process.env.MONGODB_DB;
  if (!dbName && process.env.DATABASE_URL) {
    // Extract from URL: mongodb+srv://user:pass@host/dbname?params
    const urlParts = process.env.DATABASE_URL.split("?")[0].split("/");
    if (urlParts.length > 0) {
      dbName = urlParts[urlParts.length - 1];
    }
  }

  dbName = dbName || "van-main";
  return connectedClient.db(dbName);
}

