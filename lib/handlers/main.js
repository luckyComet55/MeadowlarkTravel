const { getFortune } = require("../fortune");

exports.home = (req, res) => {
    return res.render("home");
}

exports.about = (req, res) => {
    return res.render("about", { fortune: getFortune() });
}