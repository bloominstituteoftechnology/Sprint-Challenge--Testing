const request = require('supertest');
const server = require('./server');

/* Check this endpoint for...
*  The correct status code.
*  That it is sending back a JSON object.
*/

describe('Checking the get endpoint for /games', () => {
    it('Sends back the correct status code.', async () => {
        const response = request(server).get('/games');
        expect(response.status).toBe(200);
    });
    it('Sends back the correct data type.', async () => {
        const response = request(server).get('/games');
        expect(response.type).toMatch(/json/i);
    });
});

describe('Checking the post endpoint for /games', () => {

});