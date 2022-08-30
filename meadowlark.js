import express from "express";
import {engine} from "express-handlebars";
import {URL} from "url";
import getFortune from "./lib/fortune.js";
import * as handlers from "./lib/handlers.js"
const port = 3000;
const __dirname = new URL(".", import.meta.url).pathname;
const app = express();



app.engine("handlebars", engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars");

console.log(__dirname + "public")
app.use(express.static("public"));

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.use(handlers.notFound);

app.use(handlers.serverError);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
