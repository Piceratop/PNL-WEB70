import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const generateToken = (data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
    });
    return token;
};

const checkToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.log(error);
    }
};

export { generateToken, checkToken };
