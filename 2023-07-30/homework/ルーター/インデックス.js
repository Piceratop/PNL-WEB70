import { Router } from "express";
import 認証ルーター from "./認証.js";

const ルーター = Router();
ルーター.use("/auth", 認証ルーター);

export default ルーター;
