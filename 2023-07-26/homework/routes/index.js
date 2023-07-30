import { Router } from "express";
import userRouter from "./users.js";
import postRouter from "./posts.js";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
