import jwt from "jsonwebtoken";
const JWT_SECRET =
    "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";
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

const resClientData = (res, status, data, message) => {
    res.status(status).send({
        data: data ? data : null,
        success: !!data,
        message: message ? message : data ? "Success" : "Error",
    });
};

export { generateToken, verifyToken, resClientData };
