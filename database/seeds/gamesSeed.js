
exports.seed = function(knex, Promise) {
  
  return knex('games')
        .truncate()
        .then(function () {
      
        // Inserts seed entries
        return knex('games')
               .insert([
                        {id: 1, title: 'Game-1', genre : 'XYZ', releaseYear : 1998},
                        {id: 2, title: 'Game-2', genre : 'XYZ', releaseYear : 2000},
                        {id: 3, title: 'Game-3', genre : 'XYZ', releaseYear : 2002}
                ]);
        });
};
