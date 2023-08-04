import { Router } from "express";
import middlewares from "../middlewares/index.js";
import { users, posts } from "../data/index.js";

const postRouter = Router();
postRouter.post(
    "/reaction/:id",
    middlewares.verifyToken,
    middlewares.validateUser,
    (req, res) => {
        try {
            const postId = req.params.id;
            const userId = req.userId;
            const post = posts.find((post) => post.id === postId);
            if (!post) {
                res.status(404).send({
                    data: null,
                    status: 404,
                    message: "Post not found",
                });
                return;
            }
            if (post.hasOwnProperty("liked")) {
                if (post.liked.includes(userId)) {
                    post.liked.splice(post.liked.indexOf(userId), 1);
                } else {
                    post.liked.push(userId);
                }
            } else {
                post.liked = [userId];
            }
            res.status(200).send({
                data: post,
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

postRouter.post(
    "/:id",
    middlewares.verifyToken,
    middlewares.validateUser,
    (req, res) => {
        try {
            const postId = req.params.id;
            const userId = req.userId;
            const post = posts.find((post) => post.id === postId);
            if (!post) {
                res.status(404).send({
                    data: null,
                    status: 404,
                    message: "Post not found",
                });
                return;
            }
            if (post.userId === userId) {
                const { title, body } = req.body;
                if (title) {
                    post.title = title;
                }
                if (body) {
                    post.body = body;
                }
                res.status(200).send({
                    data: post,
                    status: 200,
                    message: "Success",
                });
            } else {
                res.status(403).send({
                    data: null,
                    status: 403,
                    message: "Not authorized to edit the post",
                });
            }
        } catch (error) {
            res.status(500).send({
                data: null,
                status: 500,
                message: error.message,
            });
        }
    }
);

export default postRouter;
