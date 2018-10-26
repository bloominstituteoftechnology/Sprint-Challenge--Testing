const knex = require('knex');
const knexConfig = require('../knexfile').development;
module.exports = knex(knexConfig);