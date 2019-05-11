
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {
          title: 'Pacman', // required
          genre: 'Arcade', // required
          releaseYear: 1980 // not required
        }, 
        {
          title: 'Street Fighter', // required
          genre: 'Arcade', // required
          releaseYear: 1987 // not required
        }
      ]);
    });
};
