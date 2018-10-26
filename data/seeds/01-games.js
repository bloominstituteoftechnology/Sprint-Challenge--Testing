
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {title: 'Pokemon Go', genre: 'AR', releaseYear: 2016 },
        {title: 'Final Fantasy VII', genre: 'RPG', releaseYear: 1997 },
        {title: 'Fallout 2', genre: 'RPG', releaseYear: null },
        {title: 'SimCity 2000', genre: 'City-building', releaseYear: 1993 },
        {title: 'Super Mario Odyssey', genre: 'Platformer', releaseYear: 2017 },
      ]);
    });
};
