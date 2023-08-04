import { Router } from "express";
import crypto from "crypto";
import { users } from "../data/index.js";
import { generateToken } from "../utils/index.js";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).send({
                data: null,
                status: 400,
                message: "Missing username or password",
            });
            return;
        }
        const user = users.find((user) => user.username === username);
        if (!user) {
            res.status(404).send({
                data: null,
                status: 404,
                message: "User not found",
            });
            return;
        }
        if (user.password !== password) {
            res.status(401).send({
                data: null,
                status: 401,
                message: "Invalid password",
            });
            return;
        }
        res.status(200).send({
            data: generateToken({ userId: user.id }),
            status: 200,
            message: "Success",
        });
        return;
    } catch (error) {
        res.status(500).send({
            data: null,
            status: 500,
            message: error.message,
        });
    }
});

authRouter.post("/register", (req, res) => {
    try {
        const { username, password } = req.body;
        const usernameRegex = /^[a-zA-Z0-9_]{4,30}$/;
        if (!usernameRegex.test(username)) {
            res.status(400).send({
                data: null,
                status: 400,
                message: "Invalid username",
            });
            return;
        }
        const userExists = users.some((user) => user.username === username);
        if (userExists) {
            res.status(409).send({
                data: null,
                status: 409,
                message: "Username already exists",
            });
            return;
        }
        if (password.length < 6) {
            res.status(400).send({
                data: null,
                status: 400,
                message: "Password must be at least 6 characters long",
            });
            return;
        }
        const userId = crypto.randomUUID();
        users.push({
            id: userId,
            username,
            password,
            fullname: username,
        });
        res.status(200).send({
            data: generateToken({ userId }),
            status: 200,
            message: "Success",
        });
    } catch (error) {
        res.status(500).send({
            data: null,
            status: 500,
            message: error.message,
        });
    }
});

export default authRouter;
