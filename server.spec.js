const request = require('supertest');
// const knex = require('knex');

const server = require('./server');

describe('server', () => {
	describe('POST /games', () => {
		it('should add game to the database', async () => {
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
	});

	describe('GET /games', () => {});
});
