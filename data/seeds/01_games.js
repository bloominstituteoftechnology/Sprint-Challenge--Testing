
exports.seed = function(knex, Promise) {
  return knex('games').truncate()
    .then(function () {
      return knex('games').insert([
        {id: 1, title: 'Kingdom Hearts', genre: 'RPG', releaseYear: 2002},
        {id: 2, title: 'Red Dead Redemption', genre: 'Action-adventure', releaseYear: 2010},
        {id: 3, title: 'Halo', genre: 'First-person shooter', releaseYear: 2001},
      ]);
    });
};
