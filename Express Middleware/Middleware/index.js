const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Middleware 1 Running");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2 Running");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Middleware Functionality");
});

function routeSpecificMiddleware(req, res, next) {
  console.log("Inside Route Specific middleware");
  next();
}

app.get("/routespecific", routeSpecificMiddleware, (req, res) => {
  res.send("Route Specific Middleware");
});

app.get("/error", (req, res, next) => {
  const e = new Error("Something went Wrong");
  console.log("Inside error route handler");

  next(e);
});

app.use((err, req, res, next) => {
  console.log(err.message);

  res.status(500).send(err.message);
});

const PORT = 3000;

app.listen(3000, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
