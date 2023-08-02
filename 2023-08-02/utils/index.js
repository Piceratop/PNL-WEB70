import jwt from "jsonwebtoken";
const JWT_SECRET = "lakjsdlkaksdlkfjasdjfsajdf";
const generateToken = (data) => {
    const token = jwt.sign(data, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
    });
    return token;
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.log(error);
    }
};

export { generateToken, verifyToken };
