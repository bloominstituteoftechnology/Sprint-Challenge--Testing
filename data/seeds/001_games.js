exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('games')
    .truncate()
    .then(function() {
      return knex('games').insert([
        { title: 'monopoly', genre: 'Family', releaseYear: '2000'},
        { title: 'hungry hippo', genre: 'Action', releaseYear: '2001'},
        { title: 'connect-four', genre: 'Competitive', releaseYear: '2002'},
      ]);
    });
};
