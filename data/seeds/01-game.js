
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'rings', genre:'old', releaseYear:'1989'},
        {id: 2, title: 'clown', genre:'clouds', releaseYear:'1990'},
       ]);
    });
};
