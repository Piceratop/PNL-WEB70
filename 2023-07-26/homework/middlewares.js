import { users } from "./data/users.js";
import { posts } from "./data/posts.js";

export function checkExistingUser(req, res, next) {
    const { userId } = req.query;
    const userExists = users.find((user) => user.id === userId);

    if (!userExists) {
        res.status(400).send("ユーザーが存在しません。");
        return;
    }
    next();
}

export function checkExistingPost(req, res, next) {
    const { id } = req.params;
    const postExists = posts.find((post) => post.id === id);

    if (!postExists) {
        res.status(400).send("記事は存在しません。");
        return;
    }
    next();
}
