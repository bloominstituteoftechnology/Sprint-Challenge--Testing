const db = require('../data/dbConfig');
require('events').EventEmitter.defaultMaxListeners = 0;

const fetch = (id) => {
    if(id){
        return db('games').where('id', id)
            .then(games => {
                return games[0]
            })
    }
    return db('games')
        .then(games => {
            return games
        })
}

const insert = (game) => {
    return db('games').insert(game)
        .then( ([id]) => fetch(id))
}

const remove = (id) => {
    return db('games').where('id', id).del(id)
}

module.exports = {
    fetch, insert, remove 
}