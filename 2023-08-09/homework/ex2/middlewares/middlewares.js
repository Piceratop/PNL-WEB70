import { verifyToken, resClientData } from "../utils/utils.js";
import { dbCollection } from "../database/database.js";

const middlewares = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = verifyToken(token);
            req.userId = decodedToken.id;
            next();
        } catch (error) {
            resClientData(res, 500, null, error.message);
            return;
        }
    },
    validateUser: async (req, res, next) => {
        try {
            const user = await dbCollection["users"]
                .find({ id: req.userId })
                .toArray();
            if (user.length === 0) {
                resClientData(res, 404, null, "User not found");
                return;
            }
            next();
        } catch (error) {
            resClientData(res, 500, null, error.message);
            return;
        }
    },
};

export default middlewares;
