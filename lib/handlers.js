const { getFortune } = require("./fortune.js");
const { query } = require("express");
const { Form } = require("multiparty");
const fs = require("fs");
const db = require("../db");

const pathUtils = require("path");
const dataDir = pathUtils.resolve(__dirname, "..", "data");
const vacationPhotosDir = pathUtils.resolve(dataDir, "vacation-photos");
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if(!fs.existsSync(vacationPhotosDir)) fs.mkdirSync(vacationPhotosDir);

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

function saveContestEntry(contestName, email, year, month, photoPath) {

}
const { promisify } = require("util");
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);

const vacationPhotoContestProcess = async (req, res, fields, files) => {
    const photo = files.photo[0];
    const dir = vacationPhotosDir + "/" + Date.now();
    const path = dir + "/" + photo.originalFilename;
    await mkdir(dir);
    await rename(photo.path, path);
    saveContestEntry("vacation-photo", fields.email,
        fields.year, fields.month, path);
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
    vacationPhotoContestApi: async (req, res) => {
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

exports.listVacations = async (req, res) => {
    const vacations = await db.getVacations({ available: true });
    const context = {
        vacations: vacations.map(vacation => ({
            name: vacation.name,
            description: vacation.description,
            sku: vacation.sku,
            price: "USD" + vacation.price.toFixed(2),
            inSeason: vacation.inSeason,
        }))
    }
    return res.render("vacations", { vacation: context.vacations });
}

exports.notifyTrip = (req, res) => {
    return res.render("trip_notify", { sku: req.query.sku });
}

exports.notifyTripProcess = async (req, res) => {
    const { email, sku } = req.body;
    await db.addVacationInSeasonListener(email, sku);
    return res.redirect(303, "/vacations");
}

/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => {
    return res.render("500")
}
/* eslint-enable no-unused-vars */