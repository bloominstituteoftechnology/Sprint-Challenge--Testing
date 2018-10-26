const knex = require('knex')
const KnexConfig = require('../../knexfile.js')
const db = knex(KnexConfig.development)

module.exports = db
