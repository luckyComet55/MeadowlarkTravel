import getFortune from "./fortune.js";

export function home(req, res) {
    return res.render("home");
}

export function about(req, res) {
    return res.render("about", {fortune: getFortune()});
}

export function notFound(req, res) {
    return res.render("404");
}

export function serverError(err, req, res, next) {
    return res.render("500")
}