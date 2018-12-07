const express = require('express')

const router = express();

let games = []

router.get('/', (q, s) => {
  if (games.length !== 0) {
    s.status(200).json(games)
  } else {

    s.status(200).json([])
  }
})

router.post('/', (q, s) => {
  const { title, genre, releaseYear } = req.body;
  if (title !== undefined 
   && genre !== undefined 
   && releaseYear !== undefined) {
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