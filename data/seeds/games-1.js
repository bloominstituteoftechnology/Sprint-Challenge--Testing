
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {title: 'Racing Game'},
        {title: 'Shooting Game'},
        {title: 'Adventure Game'}
      ]);
    });
};
