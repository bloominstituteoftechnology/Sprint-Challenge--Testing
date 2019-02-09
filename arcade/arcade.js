const db = require('../dbConfig')


module.exports = {
    getAll: () => {
       return db('games')
    },
    insert: (game) => {
        return db('games').insert(game)
    },
}