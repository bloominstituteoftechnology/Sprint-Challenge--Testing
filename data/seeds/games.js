
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        { title: 'Pacman', genre:'Arcade', releaseDate: '1980'},
      ]);
    });
};
