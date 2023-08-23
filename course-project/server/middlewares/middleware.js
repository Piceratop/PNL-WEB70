import { checkToken } from "../utils/util.js";
import { dbCollections } from "../database/db.js";

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = checkToken(token, res);
        req.user = decodedToken.user;
        next();
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
}

function validateUser(req, res, next) {
    try {
        const user = dbCollections.users.findOne({ user: req.user });
        if (!user) {
            return res.status(404).send({
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

export { verifyToken, validateUser };
