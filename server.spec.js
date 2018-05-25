const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {
	beforeAll(() => {
		return mongoose
			.connect('mongodb://localhost/test')
			.then(() => console.log('\n=== connected to TEST DB ==='));
	});

	afterAll(() => {
		return mongoose
			.disconnect()
			.then(() => console.log('\n=== disconnected from TEST DB ==='));
	});

	let gameId;
	// // hint - these wont be constants because you'll need to override them.

	beforeEach(async () => {
		const game = {
			title: 'Mario Bros',
			genre: 'platform',
			releaseDate: '1983',
		};
		const savedGame = await Game.create(game);
		gameId = savedGame._id;
	});

	afterEach(() => {
		Game.remove();
	});

	it('runs the tests', () => {});

	describe('POST', () => {
		it('should create a new game in Games', async () => {
			request(server)
				.post('/api/games')
				.send(Game)
				.expect('Content-Type', /json/)
				.expect(201);
		});

		it('should error when a new game POST does not include title or genre', () => {
			const noTitle = { genre: 'platform', releaseDate: '1983' };
			const noGenre = { title: 'Mario Bros', releaseDate: '1983' };

			request(server)
				.post('/api/games')
				.send(noTitle)
				.expect('Content-Type', /json/)
				.expect(500);

			request(server)
				.post('/api/games')
				.send(noGenre)
				.expect('Content-Type', /json/)
				.expect(500);
		});
	});

	describe('GET', () => {
		it('should return all games from database', async () => {
			request(server)
				.get('/api/games')
				.expect(200)
				.expect(res => res.length === 0);

			const savedGame = await Game.create(Game);
			const anotherGame = await Game.create({
				title: 'Tempest',
				genre: '3rd person',
				releaseDate: '1981',
			});

			request(server)
				.get('/api/games')
				.expect(200)
				.expect(res => res.length === 2);
		});
	});

	describe('DELETE', () => {
		it('should delete an existing game by correct ID', async () => {
			const savedGame = await Game.create(Game);
			request(server)
				.delete(`/api/games/${gameId}`)
				.expect(204); // game exists and has been removed test
		});
		it('should error if an id is not provided on deletion', async () => {
			request(server)
				.delete('/api/games')
				.expect('Content-Type', /json/)
				.expect(res => res.message === 'You need to give me an ID')
				.expect(422);
		});
		it('should error if an incorrect/invalid is provided on deletion', async () => {
			request(server)
				.delete('/api/game/blah')
				.expect('Content-Type', /json/)
				.expect(res => res.message === 'Game not found')
				.expect(404);
		});
	});
});
