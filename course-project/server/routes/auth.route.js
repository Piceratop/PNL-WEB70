import { Router } from "express";
import bcrypt from "bcrypt";
import { dbCollections } from "../database/db.js";
import { generateToken } from "../utils/util.js";

const authRoute = Router();
authRoute.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const users = dbCollections.users;

        const existingUsername = await users.findOne({ username });
        const existingEmail = await users.findOne({ email });

        if (existingUsername) {
            return res.status(400).json({ error: "Username already exists." });
        }

        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await users.insertOne({
            username,
            email,
            password: hashedPassword,
        });
        const token = generateToken({ username, email });
        return res
            .status(201)
            .json({ message: "User created successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

authRoute.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = dbCollections.users;
        const user = await users.findOne({
            $or: [{ username }, { email: username }],
        });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials." });
        }
        const token = generateToken({ username, email: user.email });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default authRoute;
