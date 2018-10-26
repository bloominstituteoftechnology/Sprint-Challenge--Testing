const knex = require('knex')
const knexConfig = require('../../knexfile.js');
const db = knex(knexConfig.development)

module.exports = {
  find,
  findById,
  insert,
  // delete
}


  function find() {
    return db('Games')
  }

  function findById(id) {
    console.log('ID:', id);
    return db('Games')
      .where({id: id})
  }

  function insert(game) {
    return db('Games')
      .insert(game)
  }

  // function delete(id) {
  //
  // }
