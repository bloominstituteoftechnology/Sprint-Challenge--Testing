
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        { title: 'SpiderMan', genre: 'RPG', releaseYear: 2018 },
        { title: 'FIFA19', genre: 'Sports', releaseYear: 2018 },
        { title: 'Fortnite', genre: 'RPG', releaseYear: 2017 }
      ]);
    });
};
