
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {title: 'Pacman', genre: 'Arcade', releaseYear: 1980},
        {title: 'Contra', genre: 'Action', releaseYear: 1985},
        {title: 'Donkey Kong', genre: 'Arcade', releaseYear: 1983}
      ]);
    });
};
