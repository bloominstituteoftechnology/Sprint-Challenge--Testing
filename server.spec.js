const request = require('supertest');

const server = require('./server.js');

//tests for GET /
describe ('GET request for /', () => {
    it('returns a 200 status code', async () => {
        //get access to the server
        //use supertest to run a get request to server
        const response = await request(server).get('/');

        expect(response.status).toEqual(200);
    });
    it('returns {api: "running"}', async () => {
        const expectedBody = { api: 'running'}
        const response = await request(server).get('/');
        
        expect(response.body).toEqual(expectedBody);
    });
});

//Tests for getting list of games on /games endpoint
describe('GET request for games', () => {

    it('returns a list of games', async() => {
        const response = await request(server);
        response
        .get('/games')
        .expect(response.body).toMatchObject({games:[
                {id: '1', name: 'monopoly', difficulty: 'easy'},     
                {id: '2', name: 'chess', difficulty: 'hard'},
                {id: '3', name: 'uno', difficulty: 'easy'},
                {id: '4', name: 'scrabble', difficulty: 'medium'},
                {id: '5', name: 'checkers', difficulty: 'easy'}   
        ]});
    });

    it('returns a 200 status code', async () => {
        const response = await request(server);
        response
        .get('/games')
        .expect(response.status).toEqual(200);
    })

    it('returns an empty array if no data', async () => {
        const response = await request(server)
        response
        .get('/games')
        .expect(response.body).toMatchObject([]);
    });
})


