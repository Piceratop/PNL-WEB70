import { verifyToken } from "../utils/index.js";
import { users } from "../data/index.js";

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = verifyToken(token);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
}

function validateUser(req, res, next) {
    try {
        const user = users.find((user) => user.id === req.userId);
        if (!user) {
            return res.status(404).send({
                data: null,
                status: 404,
                message: "User not found",
            });
        }
        next();
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
}

export default { verifyToken, validateUser };
