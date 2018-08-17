exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("games")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("games").insert([
        {
          id: 1,
          title: "Pacman",
          genre: "Cat & Mouse",
          releaseYear: "1978"
        },
        {
          id: 2,
          title: "Astroids",
          genre: "Space Shooter",
          releaseYear: "1980"
        },
        {
          id: 3,
          title: "Street Fighter",
          genre: "Fighting",
          releaseYear: "2000"
        }
      ]);
    });
};
