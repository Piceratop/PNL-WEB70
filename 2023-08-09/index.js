import express from "express";
import { connectDb } from "./database/index.js";
import route from "./routes/index.js";

const app = express();
app.use(express.json());
app.use("/api", route);

app.listen(3000, () => {
    connectDb();
    console.log("Server is running on port 3000.");
});
