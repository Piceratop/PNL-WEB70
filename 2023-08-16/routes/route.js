import { Router } from "express";
import userRouter from "./users.route.js";

const route = Router();
route.use("/users", userRouter);

export default route;
