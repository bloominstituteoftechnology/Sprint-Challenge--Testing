const request = require('supertest');

const server = require('../server.js');
const { statusObj } = require('../errorHandler/handlers');

describe('~~ server.js ~~', () => {
	describe('~~ GET something without a route ~~', () => {
		it('should return status 404 (not found) when browsing to "/games/gibberish"', async () => {
			const response = await request(server).get('/games/gibberish');
			expect(response.status).toBe(404);
		});

		it('should return JSON', async () => {
			const response = await request(server).get('/games/gibberish');
			expect(response.type).toBe('application/json');
		});

		it('should return a custom JSON 404 status object when GET "/games/gibberish"', async () => {
			const expected = statusObj('h404', `The requested path '/games/gibberish' doesn't exist.`);
			const response = await request(server).get('/games/gibberish');
			expect(response.body).toEqual(expected);
		});
	});
});
