import express, { json } from "express";
import router from "./routes/index.js";

const app = express();
app.use(json());
app.use("/api", router);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
