const express = require("express");
const {engine} = require("express-handlebars");
const handlers = require("./lib/handlers.js");
const port = 3000;
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
