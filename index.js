const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000; // Use dynamic port for Render

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

let tasks = []; // Array to store tasks

// Home route - Display tasks
app.get("/", (req, res) => {
    res.render("index", { tasks });
});

// Add a new task
app.post("/add", (req, res) => {
    const task = req.body.task;
    if (task.trim() !== "") {
        tasks.push(task);
    }
    res.redirect("/");
});

// Delete a task
app.post("/delete", (req, res) => {
    const index = req.body.index;
    tasks.splice(index, 1);
    res.redirect("/");
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
