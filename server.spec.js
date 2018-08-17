const request = require('supertest');
const server = require('./server');

describe('GET /server', () => {
    it('should return 200 status code', async () => {
        const res = await request(server)
        .get('/games')
        expect(res.status).toEqual(200);
    })

    it('should return an array of games', async () => {
        const expected = [{
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        }];
        const res = await request(server)
        .get('/games')
        expect(res.body).toEqual(expected)
    })

    it('should return an empty array if no games are supplied', async () => {
        const expected = [];
        const res = await request(server)
        .get('/games')
        expect(res.body).toEqual(expected);
    })

    it('should return 500 status code if error', async () => {
        const res = await request(server)
        .get('/games')
        expect(res.status).toEqual(500);
    })
});

describe('POST /games', () => {
    it('should take an object{title: , genre: , releaseYear: }', async () => {
        const newGame = {
            title: 'Minecraft',
            genre: 'sandbox',
            releaseYear: 2011
        }
        const res = await request(server)
        .post('/games')
        .send(newGame)
        expect(res.body).toEqual(newGame)
    })

    it('should return 200 status code', async () => {
        const newGame = {
            title: 'Minecraft',
            genre: 'sandbox',
            releaseYear: 2011
        }
        const res = await request(server)
        .post('/games')
        .send(newGame)
        expect(res.status).toEqual(200);
    })

    it('should return 422 status code', async () => {
        const newGame = {
            title: 'Minecraft',
            releaseYear: 2011
        }
        const res = await request(server)
        .post('/games')
        .send(newGame)
        expect(res.status).toEqual(422);
    })

 /*   it('should return 500 status code if error', async () => {
        const newGame = {
            title: 'Minecraft',
            genre: 'sandbox',
            releaseYear: 2011
        }
        const res = await request(server)
        .post('/games')
        .send(newGame)
        expect(res.status).toEqual(500);
    })*/
})