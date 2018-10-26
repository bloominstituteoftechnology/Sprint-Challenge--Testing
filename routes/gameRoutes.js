const express	= require('express');
const gameDb	= require('../data/models/gameDb.js');

const router	= express.Router();

// sanity check
router.get('/', (req, res) => res.status(200).json({ message: 'Server is running.' }));

module.exports = router;
