const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const port = 4444;
const mimeType = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".jpg": "image/jpeg",
  ".bmp": "image/bmp",
  ".png": "image/png",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".html": "text/html",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml"
};

const server = http.createServer();
server.listen(port, () => {
  console.log(`Server listen on localhost:${port}`);
});
server.on("request", (req, res) => {
  const urlParse = url.parse(req.url);
  const pathname = urlParse.pathname === "/" ? "index.html" : urlParse.pathname;
  fs.readFile(pathname, (err, data) => {
    if (err) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Something wrong");
      console.log(err);
      return;
    }
    const pathParse = path.parse(pathname);
    res.writeHead(200, {
      "Content-Type": mimeType[pathParse.ext] || "text/plain"
    });
    res.end(data);
  });
});
