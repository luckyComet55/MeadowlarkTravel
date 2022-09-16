const { getFortune } = require("./fortune.js");
const {query} = require("express");

exports.home = (req, res) => {
    return res.render("home");
}

exports.about = (req, res) => {
    return res.render("about", {fortune: getFortune()});
}

exports.notFound = (req, res) => {
    return res.render("404");
}

exports.test = (req, res) => {
    return res.render("jquery_test");
}

exports.newsletter = (req, res) => {
    res.render("newsletter", { csrf: "Here lies CSRF token" });
}
exports.api = {
    newsletterSignup: (req, res) => {
        const data = req.body;
        const queryData = req.query;
        console.log(`Query string:`);
        console.info(queryData);
        console.log(`From data:`);
        console.info(data);
        res.send({ result: "success" });
    }
}

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
    return res.render("500")
}
/* eslint-enable no-unused-vars */