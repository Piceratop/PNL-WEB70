import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

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

app.put("/data/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body;
        if (!id || !name || !age) {
            return res.status(400).send("Missing required parameters");
        }
        const itemIndex = data.findIndex((item) => item.id === id);
        if (itemIndex === -1) {
            return res.status(404).send("Item not found");
        }
        data[itemIndex].name = name;
        data[itemIndex].age = age;

        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.delete("/data/:id", (req, res) => {
    try {
        const { id } = req.params;
        const itemIndex = data.findIndex((item) => item.id === id);
        if (itemIndex === -1) {
            return res.status(404).send("Item not found");
        }
        data.splice(itemIndex, 1);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
