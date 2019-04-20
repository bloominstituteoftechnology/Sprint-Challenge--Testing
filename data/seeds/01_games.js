exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("games")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("games").insert([
        { title: "Final Fantasy", genre: "fantasy" },
        { title: "Black Ops 3", genre: "strategy", releaseYear: 2016 }
      ]);
    });
};
