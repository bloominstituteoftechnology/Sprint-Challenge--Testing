
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, title: 'Mario Kart', genre: "Racing", release_year: 1995},
        {id: 2, title: 'Mortal Kombat', genre: "Fighting", release_year: 1996},
        {id: 3, title: 'Teken', genre: "Fighting", release_year: 1997},
      ]);
    });
};