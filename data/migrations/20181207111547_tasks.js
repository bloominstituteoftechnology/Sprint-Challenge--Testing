exports.up = function(knex, Promise) {
    return knex.schema.createTable('tasks', tbl => {
      tbl.increments();
  
      tbl.string('task', 255).notNullable();
      tbl.string('role', 255).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tasks');
  };
  
