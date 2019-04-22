
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('videogames').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('videogames').insert([
        {title: 'Mortal Kombat', genre: 'Fighting', releaseYear: 1992},
        {title: 'Tetris', genre: 'Puzzle', releaseYear: 1984},
        {title: 'Super Mario RPG', genre: 'Role-playing', releaseYear: 1996}
      ]);
    });
};
