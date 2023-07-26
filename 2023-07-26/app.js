import express from "express";
const app = express();

app.get("/teacher", (req, res) => {
    console.log("New req at ", new Date());
    res.send("Hello Teacher");
});

app.get("/student", (req, res) => {
    console.log("New req at ", new Date());
    res.send("Hello Student");
});

app.listen(3000, (err) => {
    if (!err) {
        console.log("App is running at 3000");
    }
});
