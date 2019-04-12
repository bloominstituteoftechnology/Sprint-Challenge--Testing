exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', tbl => {
        tbl.increments()
        tbl.text('title', 128).notNullable()
        tbl.text('genre', 128).notNullable()
        tbl.integer('releaseYear', 4).notNullable()
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games')
  };

