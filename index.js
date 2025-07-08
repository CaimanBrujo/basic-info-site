const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url}`);

  let filePath = "";

  if (req.url === "/" || req.url === "/index") {
    filePath = "index.html";
  } else if (req.url === "/about") {
    filePath = "about.html";
  } else if (req.url === "/contact-me") {
    filePath = "contact-me.html";
  } else {
    filePath = "404.html";
  }

  fs.readFile(path.join(__dirname, filePath), (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 Server Error</h1>");
    } else {
      res.writeHead(filePath === "404.html" ? 404 : 200, {
        "Content-Type": "text/html",
      });
      res.end(content);
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
