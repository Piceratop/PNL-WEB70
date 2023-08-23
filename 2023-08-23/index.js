import express from "express";
import route from "./routes/route.js";
import { connectToDb } from "./database/database.js";

const app = express();
app.use(express.json());
app.use("/api", route);
connectToDb();

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
