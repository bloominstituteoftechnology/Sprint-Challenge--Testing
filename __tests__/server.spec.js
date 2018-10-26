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
		it('should return a 200 (ok) with an empty array when there are no games in memory', async () => {
			const response = await request(server).get('/games');
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toEqual(0);
		});
	});

	describe('~~ POST ~~', () => {
		it('should return a status 201 (created) when successfully submitting a new game', async () => {
			const response = await request(server)
				.post('/games')
				.send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
			expect(response.status).toBe(201);
		});

		it('should return JSON when a POST is submitted', async () => {
			const response = await request(server)
				.post('/games')
				.send({ title: 'Street Fighter II', genre: 'Fighting' });
			expect(response.type).toBe('application/json');
		});

		it('should return the game name when successfully submitted', async () => {
			const response = await request(server)
				.post('/games')
				.send({ title: 'Bomberman', genre: 'Puzzle' });
			expect(response.body).toEqual({ title: 'Bomberman' });
		});

		it('should (incorrectly) return status 422 (Unprocessable Entity (WebDAV)) custom JSON if one or more properties are missing from the POST', async () => {
			const expected = statusObj('h422', 'Missing title or genre property.');
			const response = await request(server)
				.post('/games')
				.send({ title: 'California Games' });
			expect(response.body).toEqual(expected);
		});
	});

	describe('~~ GET /games pt2 ~~', () => {
		it('should return a status 200 (ok) for a successful GET to /games', async () => {
			const response = await request(server).get('/games');
			expect(response.status).toBe(200);
		});

		it('should return JSON when a GET is submitted', async () => {
			const response = await request(server).get('/games');
			expect(response.type).toBe('application/json');
		});

		it('should return an array of game objects on a successful GET', async () => {
			const expected = [
				{
					id: 0,
					title: 'Pacman',
					genre: 'Arcade',
					releaseYear: 1980
				},
				{
					id: 1,
					title: 'Street Fighter II',
					genre: 'Fighting',
					releaseYear: null
				},
				{
					id: 2,
					title: 'Bomberman',
					genre: 'Puzzle',
					releaseYear: null
				}
			];
			const response = await request(server).get('/games');
			expect(response).toEqual(expected);
		});
	});
});
