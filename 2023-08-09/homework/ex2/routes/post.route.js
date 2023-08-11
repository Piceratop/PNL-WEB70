import { Router } from "express";
import crypto from "crypto";
import { resClientData } from "../utils/utils.js";
import { dbCollection } from "../database/database.js";
import middlewares from "../middlewares/middlewares.js";

const postRouter = Router();
postRouter.use(middlewares.verifyToken, middlewares.validateUser);
postRouter.post("/", async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.userId;
        if (!title || !body) {
            resClientData(res, 400, null, "Title and body are required");
            return;
        }
        const newPost = {
            id: crypto.randomUUID(),
            userId: userId,
            title,
            body,
            liked: 0,
        };
        await dbCollection["posts"].insertOne(newPost);
        resClientData(res, 201, null, "Success");
        return;
    } catch (error) {
        resClientData(res, 500, null, error.message);
        return;
    }
});

postRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req;
        const { title, body } = req.body;
        if (!title || !body) {
            resClientData(res, 400, null, "Title and body are required");
            return;
        }
        const post = await dbCollection["posts"].find({ id }).toArray();
        if (post.length === 0) {
            resClientData(res, 404, null, "Post not found");
            return;
        }
        if (post[0].userId !== userId) {
            resClientData(res, 401, null, "Unauthorized");
            return;
        }
        await dbCollection["posts"].updateOne(
            { id },
            { $set: { title, body } }
        );
        resClientData(res, 200, null, "Success");
        return;
    } catch (error) {
        resClientData(res, 500, null, error.message);
        return;
    }
});

export default postRouter;
