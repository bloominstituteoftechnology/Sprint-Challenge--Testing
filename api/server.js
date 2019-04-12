const express = require('express');

const server = express();

// server.use(helmet());
// server.use(cors());
server.use(express.json());


let games = [   {
                    title: 'Pacman', // required
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                },
                {
                    title: 'Pokemon',
                    genre: 'ComeAgain?',
                    releaseYear: 1990
                }
];

server.get('/', (req, res) => {
    res.send('hello mom');
  });
  
 server.get('/games', async (req, res) => {
    
  
    res.status(200).json(games);
});

server.post('/games', async (req, res) => {
  let { title, genre } = req.body;

  if( title && genre){
     games.push(req.body);
     res.status(200).json(games);
  } else
      res.status(422).json( {message: 'required fields missing'} );
})

module.exports = server;