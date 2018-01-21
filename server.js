//Never use VS Code git
//TODO: Comment the code
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) =>
{
    var now = new Date().toString();
    var log = `${now}: ${req.method} - ${req.url}`;
    console.log(log);
    fs.appendFileSync("server.log", log + "\n");
    next();
});

// app.use((req, res, next) =>
// {
//     res.render("maintenance.hbs", 
//     {
//         title: "Maintenance"
//     });
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () =>
{
    return new Date().getFullYear();
});

hbs.registerHelper("capitalize", (text) =>
{
    return text.toUpperCase();
});

app.get("/", (req, res) =>
{
    res.render("template.hbs", 
    {
        title: "Root",
        message: "Welcome to the servers root!"
    });
});

app.get("/about", (req, res) => {
    res.render("template.hbs",
        {
            title: "About",
            message: "There isn't a lot here... yet"
        });
});

app.get("/json", (req, res) =>
{
    res.send(
        {
            name: "Miguel",
            age: 15,
            gender: "Male"
        }
    );
});

app.get("/params/:id", (req, res) =>
{
    res.send("<h1>ID: " + req.params.id + "</h1>");
});

app.listen(8000, () =>
{
    console.log("Server started on port 8000, go to localhost:8000 to access the server");
});