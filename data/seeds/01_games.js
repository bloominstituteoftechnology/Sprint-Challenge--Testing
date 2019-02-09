
exports.seed = function(knex, Promise) {
  return knex('games').truncate()
    .then(function () {
      return knex('games').insert([
        {
            title: 'Asteroids',
            genre: 'Shooter',
            releaseYear: 1979
        },
        {
            title: 'Monkey Island',
            genre: 'Adventure',
            releaseYear: 1990
        },
        {
            title: 'Donkey Kong',
            genre: 'Platform',
            releaseYear: 1981
        },
        {
            title: 'EverQuest',
            genre: 'RPG',
            releaseYear: 1999
        },
        {
            title: 'Pillars of Eternity',
            genre: 'RPG',
            releaseYear: 2015
        }
    ]);
    });
};
