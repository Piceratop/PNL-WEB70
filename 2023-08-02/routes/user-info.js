import { Router } from "express";

const userInfoRouter = Router();

userInfoRouter.get("/", (req, res) => {
    try {
        res.status(200).send({
            data: listUser,
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
