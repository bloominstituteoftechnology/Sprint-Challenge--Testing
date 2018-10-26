const db = require('../dbConfig.js');

module.exports = {
	get: function(id) {
		let query = db('games');
		if (id) query.where({ id }).first();
		return query;
	},
	insert: function(user) {
		return db('games')
			.insert(user)
			.then(([id]) => this.get(id));
	},
	remove: function(id) {
		return db('games')
			.where({ id })
			.del();
	},
};
