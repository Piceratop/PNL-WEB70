import { MongoClient } from "mongodb";

const dbCollections = {};

async function connectToDatabase(uri, databaseName) {
    const client = await MongoClient.connect(uri);
    console.log("Connected to MongoDB");
    const db = client.db(databaseName);
    dbCollections["users"] = db.collection("users");
    return db;
}

export { dbCollections, connectToDatabase };
