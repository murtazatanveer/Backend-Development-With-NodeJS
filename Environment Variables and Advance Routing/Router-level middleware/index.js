const express = require("express");
const cors = require("cors");
const useRoutes = require("./Routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", useRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server Available at: http://localhost:${PORT}`);
});
