import { MongoClient } from "mongodb";

const dbCollections = {};

async function connectToDatabase(uri, databaseName) {
    const client = await MongoClient.connect(uri);
    console.log("Connected to MongoDB");
    const db = client.db(databaseName);
    dbCollections["quizes"] = db.collection("quizes");
    dbCollections["users"] = db.collection("users");
    return db;
}

export { dbCollections, connectToDatabase };
