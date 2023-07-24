import express from "express";

const app = express();

const todoList = [
    {
        id: "74d2e282-3229-44de-bb90-9f4d15354f04",
        todoName: "Làm gì đó 1",
        date: "24/07/2023",
        status: "PENDING",
    },
    {
        id: "c99b9192-6dd2-4ef8-864e-37d2360a55a4",
        todoName: "Làm gì đó 2",
        date: "23/07/2023",
        status: "TODO",
    },
    {
        id: "36128291-709e-466f-8567-966deae2f1b2",
        todoName: "Làm gì đó 3",
        date: "22/07/2023",
        status: "DOING",
    },
    {
        id: "63ae7e0d-2ea7-47f2-8dad-398b625911d8",
        todoName: "Làm gì đó 4",
        date: "21/07/2023",
        status: "DONE",
    },
];

app.get("/api/todo-list", (req, res) => {
    try {
        const query = req.query;
        const keySet = Object.keys(query);
        const todoListKeySet = Object.keys(todoList[0]);
        const checkKeySet = keySet.filter((item) =>
            todoListKeySet.includes(item)
        );
        if (checkKeySet.length === 0) {
            res.send(todoList);
            return;
        }

        const checkKeyValue = {};
        for (const key of checkKeySet) {
            checkKeyValue[key] = parseInt(query[key]);
        }

        const showedKey = [];
        if (Object.values(checkKeyValue).includes(0)) {
            for (const key of todoListKeySet) {
                showedKey.push(key);
            }
            for (const key of todoListKeySet) {
                if (checkKeyValue[key] === 0) {
                    const index = showedKey.indexOf(key);
                    showedKey.splice(index, 1);
                }
            }
        } else {
            for (const key of todoListKeySet) {
                if (checkKeyValue[key] === 1) {
                    showedKey.push(key);
                }
            }
        }

        const filteredQueryTodoList = todoList.map((item) => {
            const newTodo = {};
            for (const key of showedKey) {
                newTodo[key] = item[key];
            }
            return newTodo;
        });
        res.send(filteredQueryTodoList);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
