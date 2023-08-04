import { Router } from "express";
import { listUser } from "../data/users.js";
import { generateToken } from "../utils/index.js";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send({
                data: null,
                status: 400,
                message: "Missing email or password",
            });
            return;
        }
        const user = listUser.find((user) => user.email === email);
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
            data: generateToken({ id: user.id }),
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

export default authRouter;
