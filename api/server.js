const knex = require('knex');
const config = require('../knexfile');
const dbEnv = process.env.TESTING_DB || 'development';

module.exports = knex(config[dbEnv]);
