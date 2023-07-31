import { Router } from "express";
import { users } from "../データ/ユーザー.js";
import { ユーザーが存在するかどうかを確認する } from "../ミドルウェア/インデックス.js";

const 認証ルーター = Router();

認証ルーター.post(
    "/login",
    ユーザーが存在するかどうかを確認する,
    (依頼, 応じる) => {
        try {
            const { username, password } = 依頼.query;
            const user = users.find((user) => user.username === username);
            if (!user) {
                応じる.status(400).send(
                    "ユーザー名またはパスワードが正しくありません。"
                );
                return;
            }
        } catch (error) {
            console.log(error);
            応じる.status(500).send(error);
        }
    }
);

export default 認証ルーター;
