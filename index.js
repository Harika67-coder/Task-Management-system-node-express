require("dotenv").config();  // Load .env file

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000; // Use .env value or default to 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

let tasks = [];

app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post("/add", (req, res) => {
    const task = req.body.task;
    if (task.trim() !== "") {
        tasks.push(task);
    }
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const index = req.body.index;
    tasks.splice(index, 1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
