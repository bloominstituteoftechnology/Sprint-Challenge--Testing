
exports.seed = function(knex) {
  return knex('games').insert([
    // {title: "GTA V", genre: "Action-adventure", releaseYear: 2013 },
  ]);
};