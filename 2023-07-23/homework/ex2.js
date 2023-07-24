import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

const users = [
    {
        id: "74d2e282-3229-44de-bb90-9f4d15354f04",
        username: "vanA",
        fullname: "Nguyen Van A",
        age: 19,
    },
    {
        id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
        username: "nguyenvanB",
        fullname: "Nguyen Van B",
        age: 20,
    },
    {
        id: "36128291-709e-466f-8567-966deae2f1b2",
        username: "NVanC",
        fullname: "Nguyen Van C",
        age: 21,
    },
    {
        id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
        username: "VAND",
        fullname: "Nguyen Van D",
        age: 22,
    },
];

app.get("/api/users", (req, res) => {
    try {
        const query = req.query;
        if (Object.keys(query).length === 0) {
            res.send(users);
            return;
        }
        if (query.username) {
            const filteredUsers = users.filter((user) =>
                user.username
                    .toLowerCase()
                    .includes(query.username.toLowerCase())
            );
            res.send(filteredUsers);
        }
        if (query.sort) {
            let sortedUsers = users;
            if (query.sort === "ASC") {
                sortedUsers.sort((a, b) => a.age - b.age);
            } else if (query.sort === "DESC") {
                sortedUsers.sort((a, b) => b.age - a.age);
            }
            res.send(sortedUsers);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/api/users", (req, res) => {
    try {
        const newUser = req.body;
        const isUsernameTaken = users.some(
            (user) => user.username === newUser.username
        );

        if (isUsernameTaken) {
            res.status(400).send("Username already taken");
            return;
        }

        users.push({ ...newUser, id: crypto.randomUUID() });
        res.send(users);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
