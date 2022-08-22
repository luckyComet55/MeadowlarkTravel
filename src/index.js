const {createServer} = require("http");
const port = 3000;

const server = createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch(path) {
        case "":
            res.writeHead(200, {"ContentType": "text/plain"});
            res.end("Homepage");
            break;
        case "/about":
            res.writeHead(200, {"ContentType": "text/plain"});
            res.end("I am Ivan, I like programming. This is not my hobby, yet I like it as a job, a profession");
            break;
        default:
            res.writeHead(404, {"ContentType": "text/plain"});
            res.end("Page does not exist");
            break;
    }
})
server.listen(port, "localhost", () => {
    console.log(`Server listening on port ${port}`)
});
