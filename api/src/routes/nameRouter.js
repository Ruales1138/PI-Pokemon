const { Router } = require('express');
const { getAllNames } = require('../controllers/pokemonController');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const allNames = await getAllNames();
        res.send(allNames);
        
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;