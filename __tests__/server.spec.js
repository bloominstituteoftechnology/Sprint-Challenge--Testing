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
			expect(typeof(response.body)).toBe('object')
		})
		it('should return an empty array when no games are in the database', async () => {
			const response = await request(server).get('/api/games')
			expect((typeof response.body)).toBe('object')
			expect(response.body).toHaveLength(0)
		})
	})
})

describe('POST', () => {
	describe('/api/games', () => {
		it('should respond with 201(ADDED) when a successful request is made', async () => {
			const game = {
				title       : 'PacMan',
				genre       : 'arcade',
				releaseYear : 1982,
			}
			const response = await request(server).post('/api/games').send(game)
			expect(response.status).toBe(201)
		})
		it('should respond with a success message when request is successful', async () => {
			const game = {
				title       : 'PacMan',
				genre       : 'arcade',
				releaseYear : 1982,
			}
			const response = await request(server).post('/api/games').send(game)
			expect(response.body).toEqual({ message: 'Success' })
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
	})
})
