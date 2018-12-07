
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, task: 'cook', role: 'chef'},
        {id: 2, task: 'schedule', role: 'assistant' },
        {id: 3, task: 'lecture', role: 'teacher'}
      ]);
    });
};
