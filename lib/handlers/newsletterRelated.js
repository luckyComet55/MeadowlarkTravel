exports.newsletterSignupProcess = (req, res, fields) => {
    console.log("Data from the form:");
    console.info(fields);
    return res.send({result: "success"});
}

exports.newsletter = (req, res) => {
    return res.render("newsletter", { _csrf: "Here lies CSRF token" });
}