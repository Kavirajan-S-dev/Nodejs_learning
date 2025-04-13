const http = require("http");
const fs = require("fs");

const api = http.createServer();

api.on("request", (req, res) => {
    if (req.url === "/" || req.url === "/index") {
        fs.readFile("index.html", (err, tem) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Server Error");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(tem);
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page Not Found");
    }
});

api.listen(3001, "192.168.0.17", () => {
    console.log("Started at http://192.168.0.17:3000");
});
