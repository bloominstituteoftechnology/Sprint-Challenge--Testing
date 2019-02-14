const knex = require('knex');
const knexConfig = require('../knexfile');
const dbEnv = process.env.testing || 'development'
const db = knex(knexConfig[dbEnv])

const returnAll = () => {
  return db('games')
}

module.exports = db