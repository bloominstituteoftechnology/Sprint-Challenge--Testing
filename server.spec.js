const request = require('supertest');
// const knex = require('knex');

const server = require('./server');

describe('server', () => {
	describe('POST /games', () => {
		it('should return JSON', async () => {
			const game = {
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980
			};
			const expected = { message: `${game.title} added` };

			const response = await request(server)
				.post(`/games`)
				.send(game);

			expect(response.body).toEqual(expected);
		});

		it('should return 201 status code when game is successfully added', async () => {
			const game = {
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980
			};
			const expected = 201;

			const response = await request(server)
				.post(`/games`)
				.send(game);

			expect(response.status).toEqual(expected);
		});

		it('should return 422 status code when title not provided', async () => {
			const game = {
				genre: 'Arcade',
				releaseYear: 1980
			};
			const expected = 422;

			const response = await request(server)
				.post(`/games`)
				.send(game);

			expect(response.status).toEqual(expected);
		});

		it('should return 422 status code when genre not provided', async () => {
			const game = {
				title: 'Pacman',
				releaseYear: 1980
			};
			const expected = 422;

			const response = await request(server)
				.post(`/games`)
				.send(game);

			expect(response.status).toEqual(expected);
		});
	});

	describe('GET /games', () => {
		it('should return an array', async () => {
			const expected = true;

			const response = await request(server).get(`/games`);

			expect(Array.isArray(response.body)).toBe(expected);
		});

		it('should return 200 status code', async () => {
			const expected = 200;

			const response = await request(server).get(`/games`);

			expect(response.status).toEqual(expected);
		});
	});
});
