import { users } from "../データ/ユーザー.js";

export function ユーザーが存在するかどうかを確認する(依頼, 応じる, 次回) {
    const { username } = 依頼.query;
    const ユーザーのインデックス = users.findIndex(
        (ユーザー) => ユーザー.username === username
    );
    if (ユーザーのインデックス === -1) {
        return 応じる.status(400).send("username là bắt buộc");
    }
    次回();
}
