const db = require('../dbConfig');

module.exports = {
    get: function() {
        return db('videogames');
    },

    add: function() {
        return db('videogames').insert(videogame);
    },
}