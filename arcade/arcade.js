const db = require('../dbConfig')


module.exports = {
    getAll: () => {
       return db('games')
    },
    getById: (id) => {
        return db('games')
            .where({ id })
            .first()
    },
    insert: (game) => {
        return db('games')
            .insert(game)
            .into('games')
    },
    delete: (id) => {
        return db('games')
            .where({ id }, id)
            .del(id)
    },
    update: (id, changes) => {
        null
    }

}