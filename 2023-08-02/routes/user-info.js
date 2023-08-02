import { Router } from "express";
import { listUser } from "../data/users.js";
import middlewares from "../middlewares/index.js";

const userInfoRouter = Router();

userInfoRouter.get(
    "/",
    middlewares.verifyToken,
    middlewares.validateUser,
    (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = verifyToken(token);
            res.status(200).send({
                data: decodedToken,
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
    }
);

userInfoRouter.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const user = listUser.find((user) => user.id === id);
        if (!user) {
            res.status(404).send({
                data: null,
                status: 404,
                message: "User not found",
            });
        }
        res.status(200).send({
            data: user,
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

export default userInfoRouter;
