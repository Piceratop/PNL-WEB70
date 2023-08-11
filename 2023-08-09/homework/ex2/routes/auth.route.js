import { Router } from "express";
import crypto from "crypto";
import { generateToken, resClientData } from "../utils/utils.js";
import { dbCollection } from "../database/database.js";

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await dbCollection["users"]
            .find({ username, password })
            .toArray();
        if (user.length === 0) {
            resClientData(res, 404, null, "User not found");
            return;
        }
        const token = generateToken(user[0]);
        resClientData(res, 200, token, "Success");
        return;
    } catch (error) {
        resClientData(res, 500, null, error.message);
        return;
    }
});

authRouter.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username.length === 0) {
            resClientData(res, 400, null, "Username is required");
            return;
        }
        if (password.length < 6) {
            resClientData(
                res,
                400,
                null,
                "Password must be at least 6 characters"
            );
            return;
        }
        const user = await dbCollection["users"].find({ username }).toArray();
        if (user.length > 0) {
            resClientData(res, 409, null, "User already exists");
            return;
        }
        await dbCollection["users"].insertOne({
            id: crypto.randomUUID(),
            username,
            password,
            fullName: "",
        });
        resClientData(res, 201, null, "Success");
        return;
    } catch (error) {
        resClientData(res, 500, null, error.message);
        return;
    }
});

export default authRouter;
