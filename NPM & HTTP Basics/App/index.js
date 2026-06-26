const http = require("http");

const app = { name: "My App", ver: "1.0" };

let users = [
  { id: 1, name: "xyz" },
  { id: 2, name: "pqr" },
  { id: 3, name: "abc" },
];

let newId = 4;

const server = http.createServer((req, res) => {
  const path = req.url;
  const method = req.method;

  if (method === "GET" && path === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end("<h1>Home Page</h1>");
  }

  if (method === "GET" && path === "/about") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(app));
  }

  if (method === "GET" && path === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ total: users.length, users: users }, null, 2),
    );
  }

  if (method === "POST" && path === "/users") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const newUser = JSON.parse(body);

        if (!newUser.name || newUser.name.trim() === "") {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              error: "Please provide a name",
            }),
          );
        }

        const existingUser = users.find(
          (u) => u.name.toLowerCase() === newUser.name.trim().toLowerCase(),
        );

        if (existingUser) {
          res.writeHead(409, { "Content-Type": "application/json" });
          return res.end(
            JSON.stringify({
              error: "User already exists",
            }),
          );
        }

        const userAdded = {
          id: newId++,
          name: newUser.name.trim(),
        };

        users.push(userAdded);

        res.writeHead(201, {
          "Content-Type": "application/json",
        });
        return res.end(
          JSON.stringify(
            {
              message: "User added successfully",
              user: userAdded,
              totalUsers: users.length,
            },
            null,
            2,
          ),
        );
      } catch (error) {
        console.error("Error parsing JSON:", error.message);
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            error: "Invalid JSON format",
            message: error.message,
          }),
        );
      }
    });

    req.on("error", (err) => {
      console.error("Request error:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify({
          error: "Internal server error",
          message: err.message,
        }),
      );
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("<h1>Page Not Found</h1>");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`
    🚀 Server running at http://localhost:${PORT}
    
    📋 Available Endpoints:
    ┌─────────────────────────────────────────────┐
    │ GET  /        → Homepage (HTML)            │
    │ GET  /about   → App info (JSON)            │
    │ GET  /users   → List users (JSON)          │
    │ POST /users   → Add user (JSON)            │
    └─────────────────────────────────────────────┘
    `);
});
