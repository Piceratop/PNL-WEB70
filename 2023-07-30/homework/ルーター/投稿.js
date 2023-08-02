import { Router } from "express";
import { posts } from "../データ/投稿.js";
import { アプリケーションプログラミングインターフェースキーが有効かどうかを検査する関数 } from "../ミドルウェア/インデックス.js";

const 楨ルーター = Router();
楨ルーター.use(
    "/",
    アプリケーションプログラミングインターフェースキーが有効かどうかを検査する関数
);

楨ルーター.get("/:id", (依頼, 応じる) => {
    try {
        const { id } = 依頼.params;
        const 指定された識別番号を持つ投稿のインデックス = posts.findIndex(
            (投稿) => 投稿.id === id
        );
        if (指定された識別番号を持つ投稿のインデックス === -1) {
            応じる.status(400).send({
                message: "Bài viết không tồn tại.",
            });
            return;
        }
        const { 利用者の識別番号 } = 依頼;
        console.log(利用者の識別番号);

        if (
            posts[指定された識別番号を持つ投稿のインデックス].hasOwnProperty(
                "viewer"
            )
        ) {
            if (
                !posts[
                    指定された識別番号を持つ投稿のインデックス
                ].viewer.includes(利用者の識別番号)
            ) {
                posts[指定された識別番号を持つ投稿のインデックス].viewer.push(
                    利用者の識別番号
                );
            }
        } else {
            posts[指定された識別番号を持つ投稿のインデックス].viewer = [
                利用者の識別番号,
            ];
        }
        応じる.status(200).send(
            posts[指定された識別番号を持つ投稿のインデックス]
        );
    } catch (error) {
        console.log(error);
        応じる.status(500).send(error);
    }
});

export default 楨ルーター;
