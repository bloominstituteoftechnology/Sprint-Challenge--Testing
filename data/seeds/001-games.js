
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'Monoply', genre: 'Board', releaseYear: 1980},
        {id: 2, title: 'Axis and Allies', genre: 'Board'},
        {id: 3, title: 'Risk', genre: 'Board'}
      ]);
    });
};
