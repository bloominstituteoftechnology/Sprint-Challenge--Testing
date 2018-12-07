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
})
