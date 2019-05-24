const db = require('../data/dbConfig.js');

module.exports = {
	insert,
	get,
	getById
};

async function insert(game) {
	return db('games').insert(game).then((ids) => {
		return getById(ids[0]);
	});
}

function get() {
	return db('games');
}

function getById(id) {
	return db('games').where({ id }).first();
}
