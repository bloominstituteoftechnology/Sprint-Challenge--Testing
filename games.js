const express = require('express')

const router = express();

let games = []

router.get('/', (req, s) => {
  if (games.length !== 0) {
    s.status(200).json(games)
  } else {

    s.status(200).json([])
  }
})

// const keys = ['title', 'genre', 'releaseYear' ]
router.post('/', (req, s) => {
  console.log(req.body)
  if (req.body.title && req.body.genre) {
      const { title, genre, releaseYear } = req.body;
      s.status(200).json(
        [games.push({title, genre, releaseYear})]
      )
   } else {
     s.status(422).json({
       message: 'incomplete obj'
     })
   }
})


module.exports = router