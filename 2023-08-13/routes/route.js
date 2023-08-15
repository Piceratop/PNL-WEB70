import { Router } from "express";
import { dbCollection } from "../database/database.js";

const route = Router();

route.get("/demo", async (req, res) => {
    try {
        const restaurants = await dbCollection["restaurants"]
            .aggregate([
                { $match: { borough: "Manhattan" } },
                { $sort: { name: 1 } },
            ])
            .toArray();

        return res.json(restaurants);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export default route;
