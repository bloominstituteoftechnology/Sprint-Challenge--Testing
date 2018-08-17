
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'Tron', genreId: 1},
        {id: 2, title: 'Sonic', genreId: 2, releaseYear: 1993},
      ]);
    });
};
