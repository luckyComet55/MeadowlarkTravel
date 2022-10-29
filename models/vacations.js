const mongoose = require("mongoose");

const vacationSchema = mongoose.Schema({
    name: String,
    slug: String,
    category: String,
    sku: String,
    description: String,
    location: {
        search: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    price: Number,
    tags: [String],
    inSeason: Boolean,
    maximumGuests: Number,
    available: Boolean,
    requireWaiver: Boolean,
    notes: String,
    packagesSold: Number
})

const Vacation = mongoose.model("Vacation", vacationSchema);
module.exports = Vacation;