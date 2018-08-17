const request = require('supertest');

const server  = require('./server');



describe('server.js endpoints', () => {
    describe('GET /games', () => {
        test('should return status code 200 and games', async () => { 
    
        await request(server)
            .get('/games')
            .expect(200);
        })
    })

    describe('GET /games:id', () => {
        it('should return status code 200, JSON, and the game with the id provided', async () => {
            await request(server)
                .get('/games/1')
                .expect('Content-Type', /json/)
                .expect(200, { id: 1, title: 'Madden', genre: 'Sports' });
        });

        it('should return status code 404 if the game with the id provided does not exist', async () => {
            await request(server)
                .get('/games/5')
                .expect(404);
        })
    })


describe('POST /games' , () => {
    test('should return status code 201 and JSON', async () => {
        await request(server)
            .post('/games')
            .send({title:'Fortnite', genre: 'Action'})
            .expect('Content-Type', /json/)
            .expect(201)
    })

    test('should return status code 201, JSON, and title, body, releaseYear', async () => {
        await request(server)
            .post('/games')
            .send({title: 'Madden', genre:'Sports', releaseYear:2018});
    });

    test('should return status code 422 if title and body are not provided', async () => {
        await request(server)
            .post('/games')
            .expect(422);
    });

    it('should return status code 405 if a game with the title sent already exists', async () => {
        await request(server)
            .post('/games')
            .send({ title: 'Madden', genre: 'Sports' })
            .expect(405)
    })
})


})