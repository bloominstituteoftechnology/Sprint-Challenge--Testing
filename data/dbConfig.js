const knex = require('knex');
const knexConfig = knex('../knexfile.js').development;

module.exports = knex(knexConfig);