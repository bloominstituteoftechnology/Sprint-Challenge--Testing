exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("games")
    .truncate()
    .then(function() {
      return knex("games").insert([
        {
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        }
      ]);
    });
};
