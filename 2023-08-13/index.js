import express from "express";
import { connectDb } from "./database/database.js";
import route from "./routes/route.js";

const app = express();
app.use(express.json());
app.use("/", route);

app.listen(3000, () => {
    connectDb();
    console.log("Server is running on port 3000");
});
