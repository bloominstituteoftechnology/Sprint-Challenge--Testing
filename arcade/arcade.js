const db = require('../dbConfig')


module.exports = {
    getAll: () => {
       return db('games')
    },
    insert: () => {
        null
    },
}