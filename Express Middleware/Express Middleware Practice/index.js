const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.on("finish", () => {
    console.log(`Method: ${req.method} , Url: ${req.url} , ${req.statusCode}`);
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Main Page");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
