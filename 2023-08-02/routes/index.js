import { Router } from "express";
import authRouter from "./auth.js";
import userInfoRouter from "./user-info.js";

const router = Router();
router.use("/auth", authRouter);
router.use("/user-info", userInfoRouter);

export default router;
