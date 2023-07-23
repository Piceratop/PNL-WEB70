import express from "express";
import crypto from "crypto";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const students = [
    { id: crypto.randomUUID(), name: "Alice", age: 10 },
    { id: crypto.randomUUID(), name: "Bob", age: 11 },
    { id: crypto.randomUUID(), name: "Charlie", age: 11 },
];

app.get("/students", (req, res) => {
    res.send(students);
});
app.get("/students/add", (req, res) => {
    students.push({ id: crypto.randomUUID(), name: "Daniel", age: 12 });
    res.send(students);
});
app.get("/students/remove-duplicate-name", (req, res) => {
    const pastNames = new Set();
    const uniqueStudents = [];
    for (const student of students) {
        if (!pastNames.has(student.name)) {
            pastNames.add(student.name);
            uniqueStudents.push(student);
        }
    }

    students.length = 0;
    students.push(...uniqueStudents);
    res.send(students);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
