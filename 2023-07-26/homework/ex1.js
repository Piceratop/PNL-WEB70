// npm run ex1 to execute

import express from "express";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use("/api", router);

///////////////////////////////////////////////////////////

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
