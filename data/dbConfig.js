const knex;
const config = require('../knexfile').development;
module.exports = knex(config);