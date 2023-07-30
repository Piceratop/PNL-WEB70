import { Router } from "express";
import { users } from "../data/users.js";
import { posts } from "../data/posts.js";
import { checkExistingUser } from "../middlewares.js";

const userRouter = Router();

///////////////////////////////////////////////////////////

userRouter.get("/", (req, res) => {
    try {
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

///////////////////////////////////////////////////////////

userRouter.get("/posts", (req, res) => {
    try {
        const postsForEachUser = users.map((user) => {
            const userPosts = posts.filter((post) => post.userId === user.id);
            return {
                userId: user.id,
                posts: userPosts,
                total: userPosts.length,
            };
        });
        res.send(postsForEachUser);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

///////////////////////////////////////////////////////////

userRouter.delete("/:id", checkExistingUser, (req, res) => {
    try {
        const { id } = req.params;
        const { userIndex } = req;
        const filteredPosts = posts.filter((post) => post.userId !== id);
        posts.length = 0;
        posts.push(...filteredPosts);
        users.splice(userIndex, 1);
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

///////////////////////////////////////////////////////////

export default userRouter;
