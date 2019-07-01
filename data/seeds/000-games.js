table_name = 'games'

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(table_name).truncate()
    .then(function () {
      // Inserts seed entries
      return knex(table_name).insert([
        {title: 'Final Fantasy XIV', genre:'Fantasy MMO', releaseYear: 2010 },
        {title: 'Diablo III', genre:'Action RPG', releaseYear: 2012},
        {title: 'Overwatch', genre:'Team Based Shooter', releaseYear: 2016}
      ]);
    });
};
