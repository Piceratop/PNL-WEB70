import { MongoClient } from "mongodb";

const dbCollection = {};

const connectDb = async () => {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    console.log("db connected");
    const db = client.db("btvnWeb70");
    dbCollection["users"] = db.collection("users");
    dbCollection["posts"] = db.collection("posts");
};

export { connectDb, dbCollection };
