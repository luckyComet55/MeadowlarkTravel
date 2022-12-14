const express = require("express");
const {engine} = require("express-handlebars");
const handlers = require("./lib/handlers.js");
const weatherMiddleware = require("./lib/middleware/weather");
const bodyParser = require("body-parser");
const multiparty = require("multiparty");
const flashMiddleware = require("./lib/middleware/flash");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const routes = require("./routes");
const {credentials} = require("./config");
require("./db");
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(credentials.cookieSecret));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}))
app.use(flashMiddleware);

routes(app);

app.use(handlers.notFound);

app.use(handlers.serverError);


if(require.main === module) {
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    })
} else {
    module.exports = app;
}

