exports.seed = (knex, Promise) => {
  return knex('games')
    .truncate()
    .then(() =>
      knex('games').insert([
        { title: 'Halo: Combat Evolved', genre: 'FPS', releaseYear: 2001 },
        { title: 'Fortnite', genre: 'Battle Royale', releaseYear: 2017 },
        { title: 'God Of War', genre: 'Action Adeventure', releaseYear: 2018 }
      ])
    );
};
