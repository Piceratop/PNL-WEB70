import express from "express";
import crypto from "crypto";

const app = express();

const datas = [
    {
        id: crypto.randomUUID(),
        name: "Alice",
        age: 10,
    },
];

app.get("/data/", (req, res) => {
    res.send(datas);
});

app.get("/data/:id", (req, res) => {
    const { id } = req.params;
    const data = datas.find((data) => data.id === id);
    if (data) {
        res.send(data);
    } else {
        res.sendStatus(404);
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
