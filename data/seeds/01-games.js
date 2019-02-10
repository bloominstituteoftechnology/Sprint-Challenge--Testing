
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate().then
  (function () {
      // Inserts seed entries
      return knex('games').insert([
        { name: 'Super Mario World', genre:'Arcade' },
        { name: 'Mortal Combat 2', genre:'Arcade' },
        { name: 'Super Bomber-Man', genre:'Arcade' },
      ]);
    });
};
