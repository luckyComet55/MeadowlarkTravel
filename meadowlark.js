const express = require("express");
const {engine} = require("express-handlebars");
const handlers = require("./lib/handlers.js");
const weatherMiddleware = require("./lib/middleware/weather");
const body_parser = require("body-parser");
const multiparty = require("multiparty");
const port = 3000;
const app = express();



app.engine("handlebars", engine({
    defaultLayout: "main",
    helpers: {
        section: function (name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}))
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(weatherMiddleware);
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.get("/", handlers.home);
app.get("/about", handlers.about);
app.get("/test", handlers.test);
app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);
app.get("/contest/vacation-photo/:year/:month", handlers.vacationPhotoContest);
app.post("/api/vacation-photo-contest/:year/:month", handlers.api.vacationPhotoContestApi);

app.use(handlers.notFound);

app.use(handlers.serverError);


if(require.main === module) {
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    })
} else {
    module.exports = app;
}

