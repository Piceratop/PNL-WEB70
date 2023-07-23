import express from "express";
import crypto from "crypto";

const app = express();

const data = [
    {
        id: crypto.randomUUID(),
        name: "Alice",
        age: 10,
    },
    {
        id: crypto.randomUUID(),
        name: "Bob",
        age: 11,
    },
];

app.get("/data", (req, res) => {
    res.send(data);
});

app.get("/data/:id", (req, res) => {
    try {
        const { id } = req.params;
        const selectedData = data.find((item) => item.id === id);
        if (selectedData) {
            res.send(selectedData);
            return;
        }
        res.sendStatus(404);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
