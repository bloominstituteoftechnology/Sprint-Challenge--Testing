const express = require("express");
const app = express();
let store= [];

app.use(express.json());




app.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);


module.exports = app;
