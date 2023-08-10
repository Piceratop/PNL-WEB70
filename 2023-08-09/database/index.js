import { MongoClient } from "mongodb";

const Collections = {
    SMARTPHONE: "smartphones",
};

const dbCollection = {};

const connectDb = async () => {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    console.log("db connected");
    const db = client.db("WEB70");
    dbCollection[Collections["SMARTPHONE"]] = db.collection(
        Collections.SMARTPHONE
    );
};

export { connectDb, dbCollection, Collections };
