const router = require('express').Router();

const games = require('./gamesModel.js');
    
//check
router.get('/', async (req, res) => {
    try {
        const disk = await games.getAll();
        res.status(200).json(disk);
    } catch (err) {
        res.status(500).json({ error: 'You\'re not old enough to play this game' })
    }
});

//check
router.post('/', async (req, res) => {
    try {
        const game = await games.insert(req.body);
        res.status(201).json(game)
    } catch (err) {
        res.status(422).json({ error: 'Incomplete game data...you are not a gamer!' })
    }
});

//check
router.delete('/:id', async (req, res)  => {
    const {id} = req.params;
    try {
        const rpg = await games.remove(id).then(rpg => {
            res.status(200).json(rpg)
        });
        {
            res.status(404).end({ message: 'Player eliminated'})
        } res.json(rpg);
    } catch (err) {
        res.status(500).json({
            message: 'You have lost this round',
        });
    }
});

module.exports = router;