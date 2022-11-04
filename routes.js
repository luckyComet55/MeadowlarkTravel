const handlers = require("./lib/handlers");
const api = require("./lib/handlers/api");
const uploadRel = require("./lib/handlers/uploadRelated");
const newsletterRel = require("./lib/handlers/newsletterRelated");
const main = require("./lib/handlers/main");

module.exports = app => {
    app.get("/", main.home);
    app.get("/about", main.about);
    app.get("/test", handlers.test);
    app.get("/newsletter", newsletterRel.newsletter);
    app.post("/api/newsletter-signup", api.newsletterSignup);
    app.get("/contest/vacation-photo/:year/:month", uploadRel.vacationPhotoContest);
    app.post("/api/vacation-photo-contest/:year/:month", api.vacationPhotoContestApi);
    app.get("/vacations", handlers.listVacations);
    app.get("/notify-when-in-season", handlers.notifyTrip);
    app.post("/trip-notify", handlers.notifyTripProcess);
}