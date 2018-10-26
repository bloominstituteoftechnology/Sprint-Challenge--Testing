const request = require('supertest');
// const knex = require('knex');

const server = require('./server');

describe('server', () => {
	describe('POST /games', () => {
		it('should return JSON message', async () => {
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

	describe('GET /games', () => {});
});
