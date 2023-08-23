import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL;
const database = "learning-programming";
const dbCollection = {};

async function connectToDb() {
    try {
        const client = new MongoClient(`${url}`, {
            useUnifiedTopology: true,
        });
        await client.connect();
        console.log("Connect to DB");
        const db = client.db(database);
        dbCollection.files = db.collection("files");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

export { dbCollection, connectToDb };
