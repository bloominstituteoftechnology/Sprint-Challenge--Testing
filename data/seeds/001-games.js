
exports.seed = function(knex, Promise) {
  return knex('games')
    .truncate()
    .then(function () {
      return knex('games').insert([
        {title: 'Pacman', genre: 'Arcade', releaseYear: 1980},
        {title: 'Halo', genre: 'First-person Shooter', releaseYear: 2001},
        {title: 'Call Of Duty', genre: 'First-person Shooter', releaseYear: 2003},
        {title: 'Watch Dogs', genre: 'Action-adventure', releaseYear: 2014}
      ]);
    });
};
