import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectToDatabase } from "./database/db.js";
import route from "./routes/route.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", route);
connectToDatabase(process.env.DB_URI, process.env.DB_NAME);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
