exports.seed = function(knex, Promise) {
  return knex('gameTable')
    .truncate()
    .then(function() {
      return knex('gameTable').insert([
        { title: 'COD: 10', genre: 'Warfare', releaseYear: 2018 },
        { title: 'Fifa 19', genre: 'Sports', releaseYear: 2016 },
        { title: 'Assassins Creed', genre: 'Adventure', releaseYear: 2015 }
      ]);
    });
};
