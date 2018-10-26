const server = require('./server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');

describe('server.js', () => {
	beforeAll(() => db.migrate.rollback()
		.then(() => db.migrate.latest())
		.then(() => db.seed.run())
	);

	describe('GET /games/', () => {
		it('should return status 200(OK)', async () => {
			const response = await request(server).get('/games/');
			expect(response.status).toBe(200);
		});

		it('should return JSON', async () => {
			const response = await request(server).get('/games/');
			expect(response.type).toBe('application/json');
		});

		it('should return list of all the games', async () => {
			const response = await request(server).get('/games/');
			const expected = [
				{ 'id': 1, 'title': 'Pacman', 'genre': 'Arcade', 'releaseYear': 1980, },
				{ 'id': 2, 'title': 'Tetris', 'genre': 'Arcade', 'releaseYear': null, },
				{ 'id': 3, 'title': 'Dragon Quest', 'genre': 'RPG', 'releaseYear': null, },
			];
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toEqual(3);
			expect(response.body).toEqual(expected);
		});
	}); // describe 'GET /games/'

	describe('POST /games/', () => {
		describe('calling with all necessary info', () => {
			afterEach(() => db.migrate.rollback()
				.then(() => db.migrate.latest())
				.then(() => db.seed.run())
			);

			it('should return status 201(Created)', async () => {
				const newGame = { 'title': 'newGameTitle', 'genre': 'newGameGenre', 'releaseYear': 1990, };
				const response = await request(server).post('/games/').send(newGame);
				expect(response.status).toBe(201);
			});

			it('should return JSON', async () => {
				const newGame = { 'title': 'newGameTitle', 'genre': 'newGameGenre', 'releaseYear': 1990, };
				const response = await request(server).post('/games/').send(newGame);
				expect(response.type).toBe('application/json');
			});

			it('should return the newly inserted game', async () => {
				const newGame = { 'title': 'newGameTitle', 'genre': 'newGameGenre', 'releaseYear': 1990, };
				const response = await request(server).post('/games/').send(newGame);
				newGame['id'] = 4;
				const expected = [ newGame ];
				expect(Array.isArray(response.body)).toBe(true);
				expect(response.body.length).toEqual(1);
				expect(response.body).toEqual(expected);
			});

			it('should return the newly inserted game with release year set to null', async () => {
				const newGame = { 'title': 'newGameTitle', 'genre': 'newGameGenre' };
				const response = await request(server).post('/games/').send(newGame);
				newGame['id'] = 4;
				newGame['releaseYear'] = null;
				const expected = [ newGame ];
				expect(Array.isArray(response.body)).toBe(true);
				expect(response.body.length).toEqual(1);
				expect(response.body).toEqual(expected);
			});
		}); // describe 'calling with all necessary info'

		describe('calling without all necessary info', () => {
			afterEach(() => db.migrate.rollback()
				.then(() => db.migrate.latest())
				.then(() => db.seed.run())
			);

			it('should return status 422(Unprocessable Entity (WebDAV))', async () => {
				const response = await request(server).post('/games/');
				expect(response.status).toBe(422);
			});

			it('should return JSON', async () => {
				const response = await request(server).post('/games/');
				expect(response.type).toBe('application/json');
			});

			it('should return an error message when genre is missing', async () => {
				const newGame = { 'title': 'newGameTitle' };
				const response = await request(server).post('/games/').send(newGame);
				const expected = { error: 'Game must have title and genre.' };
				expect(typeof(response.body)).toBe('object');
				expect(response.body).toEqual(expected);
			});

			it('should return an error message when title is missing', async () => {
				const newGame = { 'genre': 'newGameGenre' };
				const response = await request(server).post('/games/').send(newGame);
				const expected = { error: 'Game must have title and genre.' };
				expect(typeof(response.body)).toBe('object');
				expect(response.body).toEqual(expected);
			});
		}); // describe 'calling without all necessary info'

		describe('calling with a duplicate game title', () => {
			afterEach(() => db.migrate.rollback()
				.then(() => db.migrate.latest())
				.then(() => db.seed.run())
			);

			it('should return status 405(Not Allowed)', async () => {
				const newGame = { 'title': 'Pacman', 'genre': 'newGameGenre' };
				const response = await request(server).post('/games/').send(newGame);
				expect(response.status).toBe(405);
			});

			it('should return JSON', async () => {
				const newGame = { 'title': 'Pacman', 'genre': 'newGameGenre' };
				const response = await request(server).post('/games/').send(newGame);
				expect(response.type).toBe('application/json');
			});

			it('should return an error message', async () => {
				const newGame = { 'title': 'Pacman', 'genre': 'newGameGenre' };
				const response = await request(server).post('/games/').send(newGame);
				const expected = { error: 'Pacman already exists.' };
				expect(typeof(response.body)).toBe('object');
				expect(response.body).toEqual(expected);
			});
		}); // describe 'calling with a duplicate game title'
	}); // describe 'POST /games/'
}); // describe 'server.js'
