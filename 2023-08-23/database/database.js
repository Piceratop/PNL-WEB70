import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/learning-programming";
const dbCollection = {};

async function connectToDb() {
    try {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();
        console.log("Connect to DB");
        const db = client.db();
        dbCollection.files = db.collection("files");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

export { dbCollection, connectToDb };
