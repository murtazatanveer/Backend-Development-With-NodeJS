const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`Method: ${req.method} , Url: ${req.url} , ${res.statusCode}`);
  });
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Main Page",
  });
});

function auth(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(404).json({ message: "Api key not found" });
  }
  next();
}

app.get("/protected", auth, (req, res) => {
  res.status(200).json({
    message: "Welcome to Protected Route",
    apiKey: req.headers["x-api-key"],
  });
});

app.get("/error", (req, res, next) => {
  next(new Error("Error Testing"));
});

app.use((err, req, res, next) => {
  res.status(200).json({ ErrorMessage: err.message });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
