import { Router } from "express";
import authRouter from "./auth.route.js";
import postRouter from "./post.route.js";

const router = Router();
router.use("/users/auth", authRouter);
router.use("/posts", postRouter);

export default router;
