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

// //Tests for getting list of games on /games endpoint
describe('GET request for games', () => {

    it('returns a list of games', async () => {
        let response = await request(server)
        .get('/games');
        expect(response.body).toMatchObject({games:[
                {id: '1', name: 'monopoly', difficulty: 'easy'},     
                {id: '2', name: 'chess', difficulty: 'hard'},
                {id: '3', name: 'uno', difficulty: 'easy'},
                {id: '4', name: 'scrabble', difficulty: 'medium'},
                {id: '5', name: 'checkers', difficulty: 'easy'}   
        ]});
    });

    it('returns a 200 status code', async () => {
        const response = await request(server)
        .get('/games');
        expect(response.status).toEqual(200);
    })

    it.skip('returns an empty array if no data', async () => {
        const response = await request(server)
        .get('/games')
        expect(response.body).toMatchObject([]);
    });
});

//tests for POST /games endpoint
//in the route handler, validate that the required fields are included inside the body. If the information is incomplete, return a 422 status code.

//write tests to verify that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data.

describe('POST /games', () => {

    it('should handle incomplete data', async () => {
        let response = await request(server)
        .post('./games')
        .send({ name: 'candy land' })

        expect(response.status).toEqual(422)
        expect(response.body).toEqual({message: 'please enter a name and a difficulty level'})
    })

    it('respond with 201 and correct data for complete inputs', async () => {
        const newGame = {
            id: '6', 
            name: 'boggle', 
            difficulty: 'easy'}; 

        let response = await request(server)
            .post('/games')
            .send(newGame)
            expect(response.status).toEqual(201);
    })

});



