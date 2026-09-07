const http = require("http");

const PORT = 3002;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello World</h1>");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// testing the siem 2
// testing the siem 3
