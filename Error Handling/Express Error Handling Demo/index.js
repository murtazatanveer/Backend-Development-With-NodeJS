const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("App Middleware");
  next();
});

app.get("/", (req, res) => {
  res.send("Server Started");
});

app.get("/data", (req, res, next) => {
  try {
    if (req.query.error == "true") {
      throw new Error("Something went wrong");
    }

    res.json({ message: "success", data: "Here's Data" });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "fail", error: err.message });
});

const PORT = 3000;

app.listen(3000, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
