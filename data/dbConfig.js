const dbEnvironment = "development";
const knex = require("knex");

const knexConfig = require("../knexfile")[dbEnvironment];

module.exports = knex(knexConfig);