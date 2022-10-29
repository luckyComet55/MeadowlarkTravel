const mongoose = require("mongoose");
const { credentials } = require("./config");
const { connectionString } = credentials.mongo;
const VacationInSeasonListener = require("./models/vacationInSeasonListener");
const Vacation = require("./models/vacations");

if (!connectionString) {
    console.log("No connection string provided!");
    process.exit(1);
}

mongoose.connect(connectionString);
const db = mongoose.connection;
db.on("error", err => {
    console.error("MongoDB error: " + err.message);
    process.exit(1);
})
db.once("open", () => console.log("Connection with database created!"));

module.exports = {
    getVacations: async (options = {}) => Vacation.find(options),
    addVacationInSeasonListener: async (email, sku) => {
        await VacationInSeasonListener.updateOne(
            { email },
            { $push: { skus: sku } },
            { upsert: true }
        )
    }
}