
exports.seed = function(knex, Promise) {
  return knex('games').truncate()
    .then(function () {
      return knex('games').insert([
        {id: 1, title: 'God of War', genre: 'Action'},
        {id: 2, title: 'Rollercoaster Tycoon', genre: 'Simulator'},
        {id: 3, title: 'Halo 5', genre: 'FPS'}
      ]);
    });
};
