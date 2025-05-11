const express = require("express");
const cors = require("cors");

require("dotenv").config();

const router = require("./Routes");

const app = express();

app.use(cors("*"));
app.use(express.json());
app.use("/api", router);

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
