const { getFortune } = require("./fortune.js");
const { query } = require("express");
const { Form } = require("multiparty");

exports.home = (req, res) => {
    return res.render("home");
}

exports.about = (req, res) => {
    return res.render("about", { fortune: getFortune() });
}

exports.notFound = (req, res) => {
    return res.render("404");
}

exports.test = (req, res) => {
    return res.render("jquery_test");
}

exports.newsletter = (req, res) => {
    return res.render("newsletter", { _csrf: "Here lies CSRF token" });
}

const vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log("Data from the form:");
    console.info(fields);
    console.log("Files:");
    console.info(files);
    return res.send({ result: "success" });
}

const newsletterSignupProcess = (req, res, fields) => {
    console.log("Data from the form:");
    console.info(fields);
    return res.send({result: "success"});
}

exports.api = {
    newsletterSignup: (req, res) => {
        const form = new Form();
        form.parse(req, (err, fields) => {
            if(err) {
                console.log(err.message);
                return res.status(500).send({error: err.message});
            }
            newsletterSignupProcess(req, res, fields);
        })
    },
    vacationPhotoContestApi: (req, res) => {
        const form = new Form();
        form.parse(req, (err, fields, files) => {
            if(err) {
                console.log(err.message);
                return res.status(500).send({error: err.message});
            }
            vacationPhotoContestProcess(req, res, fields, files);
        })
    }
}

exports.vacationPhotoContest = (req, res) => {
    return res.render("contest/vacation-photo", { _csrf: "Here lies CSRF token", year: req.params.year, month: req.params.month });
}

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
    return res.render("500")
}
/* eslint-enable no-unused-vars */