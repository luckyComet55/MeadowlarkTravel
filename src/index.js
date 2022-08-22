const {createServer} = require("http");
const port = 3000;

const server = createServer((req, res) => {
    res.writeHead(200, {"ContentType": "text/plain"});
    res.end("Hello, people!");
})
server.listen(port, "localhost", () => {
    console.log(`Server listening on port ${port}`)
});
