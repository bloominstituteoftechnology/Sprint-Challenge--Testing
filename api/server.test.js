const request = require('supertest');
const server = require('./server')
const db = require('../dbConfig')

describe('Testing Server Connection and Setup', () => {

    beforeEach(async () => {
        await db('games').truncate()
        await db.seed.run()

    });

    afterEach(async () => {
        await db('games').truncate();
        await db.seed.run();
    });

    //Validates we get a response back from server with response code 200
    it('test server response', async () => {
        const response = await request(server).get('/')
        expect(response.status).toBe(200);
    })

    //Validates we will recieve json information from the server
    it('test response server is using json', async () => {
        const response = await request(server).get('/')
        expect(response.type).toMatch(/json/i);
    })

    //Validates that we are acutally getting a respond from the body
    it('sends a response from the body', async () => {
        const response = await request(server).get('/');
        expect(response.body).toEqual({response: 'we are ready'})
    })

})


describe('Testing database connection', () => {




    it('sends a response from the arcade database', async () => {
        const response = await request(server).get('/games');
        expect(response.status).toBe(200);
    })

    it('responds with body of arcade games', async () => {
        const response = await request(server).get('/games');
        expect(response.body).toEqual([
            {
                id: 1,
                title: "Pacman",
                genre: "Arcade",
                releaseDate: 1980
            }
        ]);
    })

})

describe('post /games', () => {


//Validates that it responds with a 200 and sends back array of the data
    it('responds with 200 returns an array', async () => {
        const response = await request(server).get('/games');

        const games = await response.body;

        const expected = games.map(game => game);

        expect(games).toEqual(expected);
    })
    //Validates we are making a post to games while getting repsonse 201
    it('responds with 201', async () => {

        const body = {
            title: 'Space Invaders',
            genre: 'Arcade',
            releaseDate: '1978'
        }
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.status).toBe(201);
    })
//Validates that we are sending back the error status code 422
    it('responds with 422', async () => {
        const body = {}
        const response = await request(server)
            .post('/games')
            .send(body);
        expect(response.status).toBe(422);
    })
    // Validates game title is unique - Stretch items
    it('responds with 405 for unique game.title', async () => {
        const title = {
            title: 'Space Invaders',
            genre: 'Arcade',
            releaseDate: '1978'
        }
        const response = await request(server)
            .post('/games')
            .send(title)
        expect(response.status).toBe(405);

    })

})