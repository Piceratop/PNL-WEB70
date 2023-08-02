import { Router } from "express";
import 認証ルーター from "./認証.js";
import 楨ルーター from "./投稿.js";

const ルーター = Router();
ルーター.use("/auth", 認証ルーター);
ルーター.use("/posts", 楨ルーター);

export default ルーター;
