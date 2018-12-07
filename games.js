const express = require('express')

const router = express();

let games = []

router.get('/', (q, s) => {
  s.status(200).json(games)
})

router.post('/', (q, s) => {
  // const { title, genre, releaseYear } = req.body;
  s.status(200).json({message: 'server up!'})
})


module.exports = router