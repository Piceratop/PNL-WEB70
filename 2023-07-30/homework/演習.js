// コマンド "npm run ex" を使用してコードを実行します。

import express from "express";
import ルーター from "./ルーター/インデックス.js";

const アプリケーション = express();
アプリケーション.use(express.json());
アプリケーション.use("/api", ルーター);

アプリケーション.listen(3000, () => {
    console.log("ポート 3000 でリッスンしています。");
});
