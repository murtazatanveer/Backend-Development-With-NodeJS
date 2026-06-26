const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log("Client IP:", req.socket.remoteAddress);
  console.log("Headers : ", req.headers);

  res.end("<h1>Hello World</h1>");
});

server.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});
