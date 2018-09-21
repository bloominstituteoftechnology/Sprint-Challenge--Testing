
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {title: 'Zelda', genre: 'open world', releaseYear: 1990},
        {title: 'Mario', genre: 'old school', releaseYear: 1990},
        {title: 'Mortal Kombat', genre: 'fighting',releaseYear: 1990}
      ]);
    });
};
