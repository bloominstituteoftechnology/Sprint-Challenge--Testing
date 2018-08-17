const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            results: [
                {
                    title: 'Arkanoid',
                    genre: 'breakout',
                    releaseYear: 1986
                },
                {
                    title: 'Asteroids',
                    genre: 'multi-directional shooter',
                    releaseYear: 1979
                },
                {
                    title: 'Defender',
                    genre: 'scrolling shooter',
                    releaseYear: 1981
                },
                {
                    'title': 'Rush\'n\'Attack',
                    'year': 1985,
                    'genre': 'run and gun',
                  },
                  {
                    'title': 'Sinistar',
                    'year': 1982,
                    'genre': 'scrolling shooter',
                  },
                  {
                    'title': 'Skate or Die!',
                    'year': 1988,
                    'genre': 'skateboarding',
                  }
            ]
        }
    });
});

server.post('/', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    const games = [
        {
            title: 'Arkanoid',
            genre: 'breakout',
            releaseYear: 1986
        },
        {
            title: 'Asteroids',
            genre: 'multi-directional shooter',
            releaseYear: 1979
        },
        {
            title: 'Defender',
            genre: 'scrolling shooter',
            releaseYear: 1981
        },
        {
            'title': 'Rush\'n\'Attack',
            'year': 1985,
            'genre': 'run and gun',
          },
          {
            'title': 'Sinistar',
            'year': 1982,
            'genre': 'scrolling shooter',
          },
          {
            'title': 'Skate or Die!',
            'year': 1988,
            'genre': 'skateboarding',
          }
    ];

    // duplicate validation not working
    // const input = games.filter(game => game.title == title ? game : null);

    // if(title === input[0].title) {
    //     res.status(405).json({
    //         success: false,
    //         error: 'Title already exists in database.'
    //     });
    // }

    if(title === '' || genre === '') {
        res.status(422).json({
            success: false,
            error: 'Please enter title AND genre information.'
        });
    } else {
        res.status(200).json({
            success: true,
            data: {
                title,
                genre,
                releaseYear
            }
        });
    }
});

module.exports = server;
