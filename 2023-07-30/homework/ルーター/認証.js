import { Router } from "express";
import { users } from "../データ/ユーザー.js";
import { ユーザーが存在するかどうかを確認する } from "../ミドルウェア/インデックス.js";

const 認証ルーター = Router();

認証ルーター.post("/login", (依頼, 応じる) => {
    try {
        const { username, password } = 依頼.query;
        const ユーザーのインデックス = users.findIndex(
            (ユーザー) => ユーザー.username === username
        );
        if (!password || password !== ユーザー.password) {
            応じる.status(401).json({
                message: "username hoặc password không đúng",
            });
            return;
        }
        応じる.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log(error);
        応じる.status(500).send(error);
    }
});

export default 認証ルーター;
