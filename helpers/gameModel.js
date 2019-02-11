const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  get,
  findById,
  getId
};

async function insert(game) {
  return null;
}

async function update(id, changes) {
  return null;
}

/* function remove(id) {
  return null;
} */

function remove(id) {
  return db('games')
    .where('id', id)
    .del();
}

function get() {
  return db('games');
}

/* function findById(id) {
  return null;
} */

function find() {
    return db('games');
  }
  
  async  function findById(id) {
   // return db('games').where({ id: Number(id) });
   let query = db('games');
   if (id) {
     query.where('id', Number(id)).first();
     console.log("id:", id)
     console.log("query:", query)
   }

   return query;
  }

  async  function getId(id) {
    let query = db('games');
    if (id) {
      query.where('id', Number(id)).first();
      console.log("id:", id)
      console.log("query:", query)
    }

    return query;
  }
