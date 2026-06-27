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
  const id = req.params.id;
  const u = users.find((user) => user.id == id);

  if (u) {
    return res.send(u);
  }
  res.send({ message: "User Not Found" });
});

app.post("/users", (req, res) => {
  res.json({ message: "User Created Sucessfully" });
});

app.get("/student/:dep/:id", (req, res) => {
  console.log(req.params.dep);
  console.log(req.params.id);
  res.send({ dep: req.params.dep, rollno: req.params.id });
});

app.get("/products", (req, res) => {
  console.log(req.query.category);
  console.log(req.query.brand);
  res.send(req.query);
});

app.get("/products/:category", (req, res) => {
  console.log(req.params.category);
  console.log(req.query.brand);
  res.send({ category: req.params.category, brand: req.query.brand });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
