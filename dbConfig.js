const knex = require('knex');
const dbConfig = require('./knexfile.js')

const dbEnv = process.env.testing || 'development'
const db = knex(dbConfig[dbEnv])

module.exports = db;
