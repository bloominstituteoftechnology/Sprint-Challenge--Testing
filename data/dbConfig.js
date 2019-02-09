const knex = require("knex");
const dbConfig = require("../knexfile");

const DB_ENV = process.env.DB_ENV || "testing";

module.exports = knex(dbConfig[DB_ENV]);
