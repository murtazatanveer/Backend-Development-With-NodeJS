const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("User Route Middleware Executed");
  next();
});

router.get("/", (req, res) => {
  console.log("User Route Handler Executed");
  res.json({ message: "All Users" });
});

router.post("/", (req, res) => {
  console.log("POST request received");
  res.json({
    message: "User Created",
    user: req.body,
  });
});

router.get("/products", (req, res) => {
  res.json({ message: "All Products List Received" });
});

module.exports = router;
