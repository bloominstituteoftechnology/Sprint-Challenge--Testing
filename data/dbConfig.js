const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.TESTING_DB || 'development';

module.exports = knex(config[dbEnv]);
