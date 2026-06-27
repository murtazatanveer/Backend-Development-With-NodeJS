const express = require("express");
const app = express();

const users = [
  { id: 1, name: "Ali" },

  { id: 2, name: "Ahmed" },

  { id: 3, name: "Murtaza" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<p>Welcome to Express Js</p>");
});

app.get("/users", (req, res) => {
  res.send("users");
});

app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
  res.send(req.params.id);
});

app.post("/users", (req, res) => {
  res.json({ message: "User Created Sucessfully" });
});

app.get("/student/:dep/:id", (req, res) => {
  console.log(req.params.dep);
  console.log(req.params.id);
  res.send({ dep: req.params.dep, rollno: req.params.id });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
