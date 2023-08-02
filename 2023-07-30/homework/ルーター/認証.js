import { Router } from "express";
import crypto from "crypto";
import { users } from "../データ/ユーザー.js";
import {
    ユーザーが存在するかどうかをチェックする関数,
    パスワードが有効かどうかをチェックする機能,
} from "../ミドルウェア/インデックス.js";

const 認証ルーター = Router();

// ******************* パート1 *******************

認証ルーター.post("/login", (依頼, 応じる) => {
    try {
        const { username = "", password = "" } = 依頼.query;
        const ユーザーのインデックス = users.findIndex(
            (ユーザー) => ユーザー.username === username
        );
        if (ユーザーのインデックス === -1) {
            応じる.status(401).send({
                message: "username hoặc password không đúng",
            });
            return;
        }
        if (password !== users[ユーザーのインデックス].password) {
            応じる.status(401).send({
                message: "username hoặc password không đúng",
            });
            return;
        }
        応じる.status(200).send({
            message: "Đăng nhập thành công",
            apiKey: users[ユーザーのインデックス].apiKey,
        });
    } catch (error) {
        console.log(error);
        応じる.status(500).send(error);
    }
});

// ******************* パート2 *******************

認証ルーター.post(
    "/register",
    ユーザーが存在するかどうかをチェックする関数,
    パスワードが有効かどうかをチェックする機能,
    (依頼, 応じる) => {
        const { username, password } = 依頼.query;
        users.push({
            id: crypto.randomUUID(),
            username,
            password,
            fullname: username,
            apiKey: `${username}.${password}`,
        });
        応じる.status(200).send({
            message: "Đăng kí thành công",
        });
    }
);

export default 認証ルーター;
