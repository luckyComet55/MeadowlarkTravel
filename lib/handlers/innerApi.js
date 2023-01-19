const { Form } = require("multiparty");
const { newsletterSignupProcess } = require("./newsletterRelated");
const { vacationPhotoContestProcess } = require("./uploadRelated");

exports.newsletterSignup = (req, res) => {
    const form = new Form();
    form.parse(req, (err, fields) => {
        if(err) {
            console.log(err.message);
            return res.status(500).send({error: err.message});
        }
        newsletterSignupProcess(req, res, fields);
    })
}

exports.vacationPhotoContestApi = async (req, res) => {
    const form = new Form();
    form.parse(req, (err, fields, files) => {
        if(err) {
            console.log(err.message);
            return res.status(500).send({error: err.message});
        }
        vacationPhotoContestProcess(req, res, fields, files);
    })
}