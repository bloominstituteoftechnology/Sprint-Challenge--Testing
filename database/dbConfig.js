const knex = require('knex');
const knexConfig = require('../knexfile');
const dbEnv = process.env.testing || 'development'
const db = knex(knexConfig[dbEnv])

module.exports = db;