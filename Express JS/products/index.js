const express = require("express");

const app = express();

const products = [
  {
    id: 1,
    name: "iPhone 15",
    category: "electronics",
    price: 999,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "electronics",
    price: 899,
  },
  {
    id: 3,
    name: "Nike Air Max",
    category: "shoes",
    price: 150,
  },
  {
    id: 4,
    name: "Levi's Jeans",
    category: "clothing",
    price: 80,
  },
  {
    id: 5,
    name: "HP Pavilion Laptop",
    category: "electronics",
    price: 750,
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Products Application");
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  const pId = Number(req.params.id);

  if (isNaN(pId)) {
    return res.send({ message: "Invalid Id format" });
  }

  const product = products.find((p) => p.id === pId);

  if (product) {
    return res.json(product);
  }
  res.status(404).send("Product Not Found");
});

app.delete("/products/:id", (req, res) => {
  const pId = Number(req.params.id);

  const index = products.findIndex((p) => p.id === pId);

  if (index == -1) {
    return res.status(404).send({ message: "Produc Not Found" });
  }
  products.splice(index, 1);
  res.send({
    message: "Product Deleted Successfully",
  });
});

app.post("/products", (req, res) => {
  products.push(req.body);
  res.send({ message: `Product with id ${req.body.id} added successfully` });
});

app.get("/search", (req, res) => {
  const n = req.query.productname;

  if (!n) {
    return res.status(404).send({ message: "Search Keyword Missing" });
  }

  const prods = products.filter((p) =>
    p.name.toLowerCase().includes(n.toLowerCase()),
  );
  if (prods.length == 0) {
    return res
      .status(404)
      .send({ message: "No Product found for such Keyword" });
  }
  res.send(prods);
});

app.get("/products/category/:cat", (req, res) => {
  const cat = req.params.cat.toLowerCase();

  const prods = products.filter((p) => p.category.toLowerCase() === cat);
  if (prods.length == 0) {
    return res.send({ message: `Product with category ${cat}, not found` });
  }
  res.send(prods);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
