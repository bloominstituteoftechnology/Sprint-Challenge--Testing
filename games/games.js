let id = 1;

const games = [
  { title: 'Pacman', genre: 'Arcade', releaseYear: 1980, id: id++ }
];

const GET = (req, res) => {
  return res.status(200).json(games);
};

const POST = (req, res) => {
  const { title, genre } = req.body;
  if (!title || !genre) {
    return res.status(422).json({ message: 'Title and genre are required.' });
  }
  games.push({ title, genre, id });
  return res.status(201).json(id++);
};

module.exports = {
  GET, 
  POST
};
