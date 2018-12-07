const express = require('express')
const helmet = require('helmet')
const server = express()

const db = require('../data/dbConfig.js')

server.use(express.json())
server.use(helmet())

server.get('/', (req, res) => {
	console.log('working')
	res.status(200).json({ api: 'root endpoint is alive and well' })
})

/* ------------------ Database Driven Endpoints -------------------- */
server.get('/api/games', async (req, res) => {
	try {
		const response = await db('games')
		res.status(200).json([ ...response ])
	} catch (e) {
		res.status(500).json({ error: 'An error has occuried.' })
	}
})
server.get('/api/games/:id', async (req, res) => {
	try {
		const game = await db('games').where(req.body.params, '=', 'games.id')
		game ? res.status(200).json(game) : res.status(404).json({ message: 'Not found.' })
	} catch (e) {
		res.status(500).json({ error: 'An error has occuried.' })
	}
})
server.post('/api/games', async (req, res) => {
	const { title, genre, release_year } = req.body
	if (!title || !genre) {
		res.status(422).json({ message: 'Please provide the require information of title, genre, and release year.' })
	}
	try {
		const getTitle = await db('games').select('title')
		const look = getTitle.includes(title)
		if (look) {
			res.status(405).json({
				message : 'Not Allowed - This title already exists in the database, please try again with a new title.',
			})
		}
		const response = await db('games').insert({ title, genre, release_year })
		res.status(201).json(response)
	} catch(e) {
		res.status(500).json({ error: 'An error occuried while attempting to post to the database.' })
	}
})

server.delete('/api/games/:id', async (req, res) => {
	try {
		if (!req.body.params) {
			res.status(404).json({ message: 'Not found. ID does not exist' })
		}
		const response = await db('games').del().where(req.body.params, '=', 'games.id')
		res.status(200).json(response)
	} catch (e) {
		res.status(500).json({ error: 'An error occuried while attempting to delete the game from the database' })
	}
})
/* ------------------ Database Driven Endpoints -------------------- */

/* ------------------ MVP No DB Endpoints -------------------- */
//MVP Test - Without Database
// server.get('/api/games', (req, res) => {
// 	const games = []
// 	res.status(200).json(games)
// })

//MVP Test - Without Database
// server.post('/api/games', (req, res) => {
// 	const { title, genre } = req.body
// 	!title || !genre
// 		? res.status(422).json({ message: 'Please provide the require information of title, genre, and release year.' })
// 		: res.status(201).json({ message: 'Success' })
// })
/* ------------------ MVP No DB Endpoints -------------------- */
module.exports = server
