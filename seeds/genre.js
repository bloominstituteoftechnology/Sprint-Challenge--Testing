
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('genres').del()
    .then(function () {
      // Inserts seed entries
      return knex('genres').insert([
        {name: 'Arcade'},
        {name: 'Adventure'},
      ]);
    });
};
