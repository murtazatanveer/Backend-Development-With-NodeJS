const http = require("http");

const server = http.createServer((req, res) => {
  res.end("<h1>Hello World</h1>");
});

server.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});
