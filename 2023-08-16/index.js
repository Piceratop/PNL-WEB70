import express from "express";
import dotenv from "dotenv";
dotenv.config();
import route from "./routes/route.js";
import { connectToDb } from "./configs/db.js";

const app = express();
app.use(express.json());

connectToDb();

app.use("/api/v1/", route);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
