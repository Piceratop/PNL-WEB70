import { users } from "../データ/ユーザー.js";

export function ユーザーが存在するかどうかをチェックする関数(
    依頼,
    応じる,
    次回
) {
    const { username } = 依頼.query;
    if (!username) {
        応じる.status(400).send({
            message: "username là bắt buộc",
        });
    }
    const ユーザーが住んでいました = users.find(
        (ユーザー) => ユーザー.username === username
    );
    if (ユーザーが住んでいました) {
        return 応じる.status(400).send({
            message: "username đã tồn tại",
        });
    }
    const 正規表現 = /^[a-zA-Z0-9]+$/;
    if (!正規表現.test(username)) {
        return 応じる.status(400).send({
            message: "username sai định dạng",
        });
    }
    次回();
}

export function パスワードが有効かどうかをチェックする機能(依頼, 応じる, 次回) {
    const { password } = 依頼.query;
    if (!password) {
        応じる.status(400).send({
            message: "password là bắt buộc",
        });
    }
    const 正規表現 = /^[a-zA-Z0-9]+$/;
    if (!正規表現.test(password) || password.length < 6) {
        return 応じる.status(400).send({
            message: "password sai định dạng",
        });
    }
    次回();
}

export function アプリケーションプログラミングインターフェースキーが有効かどうかを検査する関数(
    依頼,
    応じる,
    次回
) {
    const { apiKey = "" } = 依頼.query;
    const アプリケーションプログラミングインターフェースキー索引 =
        users.findIndex((ユーザー) => ユーザー.apiKey === apiKey);
    if (アプリケーションプログラミングインターフェースキー索引 === -1) {
        return 応じる.status(400).send({
            message: "Không được phép",
        });
    }
    依頼.利用者の識別番号 =
        users[アプリケーションプログラミングインターフェースキー索引].id;
    次回();
}
