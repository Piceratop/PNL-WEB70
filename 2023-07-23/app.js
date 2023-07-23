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
    try {
        const query = req.query;
        if (Object.keys(query).length === 0) {
            res.send(data);
            return;
        }
        const getDataByField = data.map((item) => {
            const newData = {};
            for (const key in query) {
                if (parseInt(query[key])) {
                    newData[key] = item[key];
                }
            }
            return newData;
        });
        res.send(getDataByField);
    } catch (error) {
        res.sendStatus(500);
    }
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
