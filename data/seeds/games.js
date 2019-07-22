
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: '1980'},
        {id: 2, title: 'Mario', genre: 'Nintendo', releaseYear: '1990'},
        {id: 3, title: 'Pokemon', genre: 'Gameboy', releaseYear: '2000'}
      ]);
    });
};
