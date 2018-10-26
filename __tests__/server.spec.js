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

	describe('~~ GET /games pt1', () => {
		it('should return a 200 (ok) with an empty array when there are no games in memory', async () => {});
	});

	describe('~~ POST ~~', () => {
		it('should return a status 201 (created) when successfully submitting a new game', async () => {});

		it('should return JSON when a POST is submitted', async () => {});

		it('should return the game name when successfully submitted', async () => {});

		it('should (incorrectly) return a status 422 (Unprocessable Entity (WebDAV)) if an incomplete game is submitted', async () => {});
	});

	describe('~~ GET /games pt2 ~~', () => {
		it('should return a status 200 (ok) for a successful GET to /games', async () => {});

		it('should return JSON when a GET is submitted', async () => {});

		it('should return an array of game objects on a successful GET', async () => {});
	});
});
