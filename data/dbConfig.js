const knex = require("knex");
const dbConf = require("../knexfile");

 module.exports = knex(dbConf.testing);

 