let id = 1;

const games = [
    {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980, id: id++
    }
];

const getById = (gameId) => {
    return games.find(game => game.id == gameId);
};

const GET = (req, res) => {
    const gameId = req.params.id;
    if (!gameId) {
        return res.status(200).json(games);
    }

    if (getById(gameId)) {
        return res.status(200).json(getById(gameId));
    }

    return res.status(404).json({ message: 'No game  with this  id.' });
};

const POST = (req, res) => {
    const { title, genre } = req.body;
    if (!title || !genre) {
        return res.status(422).json({ message: 'Title and genre are required.' });
    }

    for (let game of games) {
        if (title === game.title) {
            return res.status(405).json({ message: 'That game title is already in use.' });
        }
    }

    games.push({ title, genre, id });
    return res.status(201).json(id++);
};

const PUT = (req, res) => {
    const game = getById(req.params.id);
    if (!game) {
        return res.status(404).json({ message: 'No game  with this id.' });
    }

    const { title, genre, releaseYear } = req.body;
    const { id } = game;
    const updated = { title, genre, releaseYear, id };
    let delBigBen;
    for (let i = 0; i < games.length; i++) {
        if (id === games[i].id) {
            delBigBen = i;
        }
    }
    return res.status(200).json(games.splice(delBigBen, 1, updated).length);
};

const DELETE = (req, res) => {
    const game = getById(req.params.id);
    if (!game) {
        return res.status(404).json({ message: 'No game with this id.' });
    }

    let delBigBen;
    for (let i = 0; i < games.length; i++) {
        if (game.id === games[i].id) {
            delBigBen = i;
        }
    }
    return res.status(202).json(games.splice(delBigBen, 1).length);
};

module.exports = {
    GET,
    POST,
    PUT,
    DELETE
};
