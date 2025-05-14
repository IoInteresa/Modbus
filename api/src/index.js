process.env.TZ = 'Asia/Yekaterinburg';

const express = require("express");
const cors = require("cors");

const router = require("./Routes");

const app = express();

app.use(cors("*"));
app.use(express.json());
app.use("/api", router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
