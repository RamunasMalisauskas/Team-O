const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./router");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/", routes);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
