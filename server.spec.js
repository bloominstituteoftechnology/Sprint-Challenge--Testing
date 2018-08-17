const request = require('supertest');

const server = require('./server.js')




describe('games endpoint and functionality', () => {
    it('returns status code 200', async () => {
        const OK = 200;
        
        const response = await request(server).get('/');
        expect(response.status).toEqual(OK);
    })

    it('gets status in response', async () => {
     


        const response = await request(server).get('/games')
        expect(response.status).toEqual(200);
    })

    it('gets body in response', async() => {
        const games = [{
            title: 'Pacman',
            genre: 'Arcade'
        }, {
            title: 'Street Fighter V',
            genre: 'Fighting'
        }, {
            title: 'Tales of the Abyss',
            genre: 'RPG'
        }, {
            title: 'Super Mario 64',
            genre: 'Adventure'
        }, {
            title: 'Zelda : Link to the Past',
            genre: 'RPG/Adventure'
        }]

        const response = await request(server).get('/games');
        expect(response.body).toEqual(games);
    })

    it('checks status for post', async() => {
         const response = await request(server).post('/games').send({title: 'Final Fantasy VI', genre: 'RPG' } );
         expect(response.status).toEqual(201);
        })

    it('gets post in response', async() => {
        const game = {
            title: 'Final Fantasy VI',
            genre: 'RPG'
        }

        const reponse = await request(server).post('/games').send({ title: 'Final Fantasy VI', genre: 'RPG' } );
        expect(reponse.body).toEqual(game);
    })
})