const db = require("../data/dbConfig.js");

module.exports = {
  getAll,
  add,
  findById
};

function getAll() {
    return db('Games')
}

function findById() {}

function add() {}
