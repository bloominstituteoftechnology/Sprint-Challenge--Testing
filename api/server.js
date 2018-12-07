const express = require('express');
const server = express();

server.use(express.json());
server.get('/', (req, res) => {
    res.status(200).json({message: 'server is working'});
});
function logger(req, res, next){
    console.log(`${req.method} to ${req.url}`);
    next();
}
server.use(logger);
// endpoints 
server.get('/games', (req, res) => {
    const games = [
        {
            title: 'Halo:CE',
            genre: 'FPS',
            releaseYear: 2001
        },
        {
            title: 'Halo 2',
            genre: 'FPS',
            releaseYear: 2004
        },
        {
            title: 'Halo 3',
            genre: 'FPS',
            releaseYear: 2007
        }
    ];
    res.status(200).json(games);
})
server.post('/games', (req, res) => {
    let {title, genre, releaseYear} = req.body;
    // check for required fields
    if(!title || !genre){
        return res.status(422).json({error: 'You must include a title and genre.'})
    }
    return res.status(201).json({message: `${title} added to games database.`})
})
module.exports = server;