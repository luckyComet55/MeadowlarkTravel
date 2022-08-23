import express from "express";
import {engine} from "express-handlebars";
import {URL} from "url";
const port = 3000;
const __dirname = new URL(".", import.meta.url).pathname;
const app = express();

const fortunes = [
    "Man, everything is going to be fine",
    "GO LIFT",
    "LIIIIIFT",
    "CARDIO",
    "After each fall there is a подъём"
]

app.engine("handlebars", engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars");

console.log(__dirname + "public")
app.use(express.static("public"));

app.get("/", (req, res) => res.render("home"));

app.get("/about", (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render("about", {fortune: randomFortune});
});

app.use((req, res) => {
    res.status(404);
    res.render("404");
})

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.render("500");
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
