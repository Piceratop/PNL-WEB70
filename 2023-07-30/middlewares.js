import { users } from "./data/users.js";
import { posts } from "./data/posts.js";

export function checkExistingUser(req, res, next) {
    const { userId } = req.query;
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
        return res.status(400).send("ユーザーが存在しません。");
    }

    req.userIndex = userIndex;
    next();
}

export function checkExistingPost(req, res, next) {
    const { id } = req.params;
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
        return res.status(400).send("記事は存在しません。");
    }

    req.postIndex = postIndex;
    next();
}
