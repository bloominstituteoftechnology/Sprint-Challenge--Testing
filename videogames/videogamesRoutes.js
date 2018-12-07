const express = require('express');
const router = express.Router();
const db = require('./videogamesModel');

// endpoints
router.get('/api/', (req, res) => {
  res.status(200).send('Server Listens and Obeys');
});

// router.get('/api/projects/', async (req, res) => {
//   console.log('Why is this not working?');
//   try {
//     const projects = await db.getProjects();
//     res.status(200).json(projects);
//   } catch (error) {
//     res.status(500).json({ error: 'There was an error while getting the projects. The error is ', error });
//   }
// });

module.exports = router;
