
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {
          title: 'The Last of Us',
          genre: 'Survival',
        }, {
          title: 'Final Fantasy 10',
          genre: 'Rpg',
          releaseYear: 2001
        },{
          title: 'Paper Mario',
          genre: 'Rpg',
          releaseYear: 2001
        }
        ]);
    });
};
