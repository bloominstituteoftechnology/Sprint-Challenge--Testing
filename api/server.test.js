const request = require('supertest');
const server = require('./server')


describe('Testing Server Connection and Setup', () => {

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
                releaseDate: 1980
            }
        ]);
    })

})