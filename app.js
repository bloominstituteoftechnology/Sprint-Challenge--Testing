const express = require("express");
const games = require('./db');

const app = express();
app.use(express.json());

const port = 9000;
app.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});