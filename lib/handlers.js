const db = require("../db");

exports.notFound = (req, res) => {
    return res.render("404");

}
exports.test = (req, res) => {
    return res.render("jquery_test");

}

function saveContestEntry(contestName, email, year, month, photoPath) {

}

exports.listVacations = async (req, res) => {
    const vacations = await db.getVacations({ available: true });
    const context = {
        vacations: vacations.map(vacation => ({
            name: vacation.name,
            description: vacation.description,
            sku: vacation.sku,
            price: vacation.price.toFixed(2) + "USD",
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