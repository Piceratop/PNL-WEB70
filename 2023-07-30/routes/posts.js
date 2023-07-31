import { Router } from "express";
import crypto from "crypto";
import { posts } from "../data/posts.js";
import { checkExistingUser, checkExistingPost } from "../middlewares.js";
import { removeDiacritics } from "../tools.js";

const postRouter = Router();

///////////////////////////////////////////////////////////

postRouter.get("/user/:userId", (req, res) => {
    try {
        const { userId } = req.params;
        const { title, content } = req.query;

        if (!title && !content) {
            const userPosts = posts.filter((post) => post.userId === userId);
            res.send(userPosts);
            return;
        }

        const filteredPosts = posts.filter((post) => {
            const postTitle = removeDiacritics(post.title)
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");
            const postContent = removeDiacritics(post.body.content)
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "");

            if (post.userId === userId) {
                if (
                    title &&
                    !postTitle.includes(
                        removeDiacritics(title)
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, "")
                    )
                ) {
                    return false;
                }
                if (
                    content &&
                    !postContent.includes(
                        removeDiacritics(content)
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, "")
                    )
                ) {
                    return false;
                }
                return true;
            }
            return false;
        });

        filteredPosts.sort((a, b) => {
            const titleA = removeDiacritics(a.title).toLowerCase();
            const titleB = removeDiacritics(b.title).toLowerCase();
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        });

        res.send(filteredPosts);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

///////////////////////////////////////////////////////////

postRouter.post("/", checkExistingUser, (req, res) => {
    try {
        const { userId } = req.query;
        const { title, body } = req.body;
        const newPost = {
            id: crypto.randomUUID(),
            userId,
            title,
            body,
        };
        posts.push(newPost);
        res.send(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

///////////////////////////////////////////////////////////

postRouter.put("/:id", checkExistingUser, checkExistingPost, (req, res) => {
    try {
        const { postIndex } = req;
        const { title, body } = req.body;
        posts[postIndex].title = title;
        posts[postIndex].body = body;
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

///////////////////////////////////////////////////////////

postRouter.delete("/:id", checkExistingPost, checkExistingUser, (req, res) => {
    try {
        const { userId } = req.query;
        const { postIndex } = req;
        if (posts[postIndex].userId !== userId) {
            res.status(403).send("不正");
            return;
        }
        posts.splice(postIndex, 1);
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

///////////////////////////////////////////////////////////

export default postRouter;
