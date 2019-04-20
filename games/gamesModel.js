const db = require("../data/dbConfig.js");

const fetch = (id) => {
    if(id){
        return db('games').where('id', id)
            .then(games => {
                return games[0]
            })
    }
    return db('games')
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
};