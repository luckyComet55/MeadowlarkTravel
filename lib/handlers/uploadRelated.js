const fs = require("fs");
const pathUtils = require("path");
const dataDir = pathUtils.resolve(__dirname, "..", "data");
const vacationPhotosDir = pathUtils.resolve(dataDir, "vacation-photos");
if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if(!fs.existsSync(vacationPhotosDir)) fs.mkdirSync(vacationPhotosDir);

const { promisify } = require("util");
const mkdir = promisify(fs.mkdir);
const rename = promisify(fs.rename);

exports.vacationPhotoContest = (req, res) => {
    return res.render("contest/vacation-photo", { _csrf: "Here lies CSRF token", year: req.params.year, month: req.params.month });
}

exports.vacationPhotoContestProcess = async (req, res, fields, files) => {
    const photo = files.photo[0];
    const dir = vacationPhotosDir + "/" + Date.now();
    const path = dir + "/" + photo.originalFilename;
    await mkdir(dir);
    await rename(photo.path, path);
    saveContestEntry("vacation-photo", fields.email,
        fields.year, fields.month, path);
    return res.send({ result: "success" });
}

function saveContestEntry(contestName, email, year, month, photoPath) {

}