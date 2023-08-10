import express from "express";
import { connectDb, dbCollection } from "./database.js";

const app = express();
app.use(express.json());

app.get("/workbook5/cau-1", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({})
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.get("/workbook5/cau-2", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({ "address.zipcode": "11209" })
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.get("/workbook5/cau-3", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({ cuisine: "American" })
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.get("/workbook5/cau-4", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({ borough: "Brooklyn" })
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.get("/workbook5/cau-5", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({ borough: "Manhattan" })
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.get("/workbook5/cau-6", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({
                cuisine: "Chicken",
                borough: "Manhattan",
            })
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.get("/workbook5/cau-7", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({
                "address.street": "Wall Street",
            })
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.get("/workbook5/cau-8", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({
                $expr: { $gt: [{ $size: "$grades" }, 3] },
            })
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.get("/workbook5/cau-9", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({
                grades: { $elemMatch: { grade: "B" } },
            })
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.get("/workbook5/cau-10", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .find({
                grades: {
                    $elemMatch: {
                        score: { $gt: 10 },
                    },
                },
            })
            .toArray();
        res.send(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

app.listen(3000, () => {
    connectDb();
    console.log("Server is running on port 3000.");
});
