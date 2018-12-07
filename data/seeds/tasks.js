
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'Pacman', genre: 'Arcade' releaseYear: 1980},
        {id: 2, title: 'Smash Brothers', genre: 'console' releaseYear: 1999 },
        {id: 3, title: 'Sonic', genre: 'consoles' releaseYear: 1991}
      ]);
    });
};
