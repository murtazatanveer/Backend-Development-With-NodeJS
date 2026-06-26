const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Home Page");
  } else if (req.url === "/Dashboard") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Dashboard");
  } else if (req.url === "/create") {
    res.writeHead(201, { "content-type": "text/plain" });
    res.end("User Created");
  } else if (req.url === "/private") {
    res.writeHead(401, { "content-type": "text/plain" });
    res.end("Unauthorized");
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Page Not Found");
  }

  //   console.log(req.url);
  //   res.write("Hello");
  //   res.write(" World");
  //   res.end();
});

server.listen(3000, () => {
  console.log("Server Available at : http://localhost:3000/");
});
