const { getFortune } = require("./fortune.js");

exports.home = (req, res) => {
    return res.render("home");
}

exports.about = (req, res) => {
    return res.render("about", {fortune: getFortune()});
}

exports.notFound = (req, res) => {
    return res.render("404");
}

exports.serverError = (err, req, res, next) => {
    return res.render("500")
}