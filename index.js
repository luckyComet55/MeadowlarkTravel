const {createServer} = require("http");
const fs = require("fs");
const port = 3000;

function createStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if(err) {
            res.writeHead(500, {"Content-type": "text/plain"});
            return res.end("500: Internal server error (on reading file)");
        }
        res.writeHead(responseCode, {"Content-type": contentType});
        res.end(data);
    })
}

const server = createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch(path) {
        case "":
            createStaticFile(res, "/public/home.html", "text/html");
            break;
        case "/about":
            createStaticFile(res, "/public/about.html", "text/html");
            break;
        case "/img/logo.png":
            createStaticFile(res, "/public/img/logo.png", "image/png");
            break;
        default:
            createStaticFile(res, "/public/404.html", "text/html", 404);
            break;
    }
})
server.listen(port, "localhost", () => {
    console.log(`Server listening on port ${port}`)
});
