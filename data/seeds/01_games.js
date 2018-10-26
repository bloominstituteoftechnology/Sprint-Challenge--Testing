
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {title: 'fortnite', genre: 'shooter', releaseYear: 2017},
        {title: 'pokemon go', genre: 'rpg', releaseYear: 2016},
        {title: 'halo', genre: 'shooter', releaseYear: 2001}
      ]);
    });
};
