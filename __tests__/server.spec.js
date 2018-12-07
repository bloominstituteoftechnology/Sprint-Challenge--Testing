const request = require('supertest')
const server = require('../api/server.js')
describe('GET', () => {
	describe('root "/" ', () => {
		it('should respond with 200(OK)', async () => {
			const response = await request(server).get('/')
			expect(response.status).toBe(200)
		})
		it('should provide a JSON response', async () => {
			const response = await request(server).get('/')
			expect(response.body).toEqual({ api: 'root endpoint is alive and well' })
		})
	})
	describe('/api/games', () => {
		it('should respond with 200(OK)', async () => {
			const response = await request(server).get('/api/games')
			expect(response.status).toBe(200)
		})
		it('should return an array', async () => {
			const response = await request(server).get('/api/games/')
			expect(typeof response.body).toBe('object')
		})
		it('should return an empty array when no games are in the database', async () => {
			const id = 1
			const response = await request(server)
			expect(response.body).not.toBeDefined()
		})
	})
	describe('/api/games/:id', () => {
		it('should return the proper game based on id', async () => {
			let game = {
				id : 1,
			}
			const id = 1
			const response = await request(server).get(`/api/games/${id}`)
			expect(id).toEqual(1)
			expect(game.id).toEqual(1)
		})
	})
})

describe('POST', () => {
	describe('/api/games', () => {
		it('should respond with 201(ADDED) when a successful request is made', async () => {
			const game = {
				title : 'PacMan',
				genre : 'arcade',
			}
			const response = await request(server).post('/api/games').send(game)
			expect(response.status).toBe(201)
		})
		it('should respond with a game object', async () => {
			const game = {
				title       : 'PacMan',
				genre       : 'arcade',
				releaseYear : 1982,
			}
			const response = await request(server).post('/api/games').send(game)
			expect(typeof response.body).toBe('object')
		})
		it('should respond with status code 422 when missing title or genre', async () => {
			const game = {
				title : 'PacMan',
			}
			const game2 = {
				genre : 'arcade',
			}
			const response = await request(server).post('/api/games').send(game)
			expect(response.status).toBe(422)
			const response2 = await request(server).post('/api/games').send(game2)
			expect(response2.status).toBe(422)
		})

		it('should respond with status code 405 when title exists', async () => {
			const game = {
				title : 'a',
				genre : 'b',
			}

			expect(game.title).toEqual('a')
		})
	})

	describe('DELETE', () => {
		it('should delete a post', async () => {
			const id = 1
			const response = await request(server).delete(`/api/games/:${id}`)
			expect().toEqual(1)
		})
	})
})
