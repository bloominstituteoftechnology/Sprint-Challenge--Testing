
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        { title:'Pacman', genre: 'Arcade', releaseYear: 1980 },
        { title:'Awesome Game', genre: 'Arcade', releaseYear: 2000 },
        { title:'Cool Game', genre: 'Video Game', releaseYear: 2010 },
        
      ]);
    });
};
